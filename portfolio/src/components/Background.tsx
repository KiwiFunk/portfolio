import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// SHADERS - GLSL (C like syntax) runs on the GPU.

// Vertex Shader
// Runs once for every vertex of 3D shape. Passes UV coords to Fragment Shader
const vertexShader = `
  // 'varying' means we are declaring a variable that will be passed down to the fragment shader.
  varying vec2 vUv;

  void main() {
    // 'uv' is a built-in Three.js variable that gives us X/Y coords ranging 0.0 to 1.0
    vUv = uv;

    // gl_Position is a required output. Tells GPU position of vertex in 3D space.
    // Force 0.99999 to prevent Z fighting.
    gl_Position = vec4(position.x, position.y, 0.99999, 1.0);
  }
`;

// Fragment Shader
// Runs once for every pixel on screen, (60fps cap with useFrame)
// Calculate final color of each pixel based on noise, mouse position, and time
const fragmentShader = `
  // 'uniforms' are variables passed from our React code (CPU) to the GPU.
  // They are called "uniform" because they stay exactly the same for every pixel during a single frame.
  uniform float u_time;
  uniform vec3 u_color;
  uniform float u_opacity;
  uniform vec2 u_mouse;
  uniform float u_aspect;

  // This receives the coordinate data we passed from the Vertex Shader.
  varying vec2 vUv;

  // Generate 3D Value Noise to create the patterns using math instead of a texture image.
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), f.x),
                   mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), f.x),
                   mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), f.x), f.y), f.z);
  }

  // entry point for fragment shader.
  void main() {

    // Multiply X coord by aspect ratio to prevent stretching.
    vec2 aspectUv = vec2(vUv.x * u_aspect, vUv.y);

    // Apply to mouse coordinates as well to keep aligned.
    vec2 aspectMouse = vec2((u_mouse.x * 0.5 + 0.5) * u_aspect, u_mouse.y * 0.5 + 0.5);

    // MOUSE INTERACTION
    // Calculate the distance from the current pixel to the mouse pointer.
    float mouseDist = distance(aspectUv, aspectMouse);

    // Mouse Distortion
    // smoothstep(radius, 0.0, distance) * strength
    //
    // Change radius to make the mouse affect a wider or smaller area.
    // Change strength to make the warping effect more or less extreme.
    float distortion = smoothstep(2.0, 0.0, mouseDist) * 0.2;

    // POSITIONING & MOVEMENT

    // aspectUv * 2.8 = A higher number (like 5.0) zooms way out. A lower number (0.5) zooms in.
    // u_time * 0.02 = Speed. Higher number means the background boils and moves faster.
    vec3 noisePos = vec3(aspectUv * 2.8 + distortion, u_time * 0.02);

    // GENERATE TOPOGRAPHY LINES FROM NOISE

    // Higher = more lines tightly packed together. Lower = fewer, widely spaced lines.
    float contourDensity = 10.0;

    float val = noise(noisePos) * contourDensity;

    // fract takes the smooth gradients of the noise and chops them up into bands of 0.0 to 1.0
    // Subtracting 0.5 and getting the absolute value creates a "V" shape, giving us the center of a line.
    float dist = abs(fract(val) - 0.5);

    // DRAW LINES
    // fwidth() looks at the neighboring pixels and tells us exactly how fast 'val' is changing.
    // This allows us to draw a line that is physically the same pixel width no matter how much you zoom.
    float fw = fwidth(val);

    float lineThickness = 1.0;
    float line = smoothstep(fw * lineThickness, 0.0, dist);

    // OUTPUT
    // We output the chosen color, and use 'line' to determine alpha.
    // If 'line' is 0.0 (empty space), it's completely transparent. If 1.0, it's solid color.
    gl_FragColor = vec4(u_color, line * u_opacity);
  }
`;

// React Component
export function BackgroundMesh({ colorHex = '#d8d8d8', opacity = 1.0 }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // between 0.0 and 1.0
  let mouseFollowDelay = 0.03;

  // useMemo prevents React from re-creating this Vector object every single time the component renders.
  const targetMouse = useMemo(() => new THREE.Vector2(0, 0), []);

  // Initialize shader's uniforms
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_color: { value: new THREE.Color(colorHex) },
    u_opacity: { value: opacity },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_aspect: { value: 1.0 },
  }), [colorHex, opacity]);

  // useFrame runs continuously at monitor's refresh rate and provides deltatime.
  useFrame((state) => {
    if (!materialRef.current) return;
    const mats = materialRef.current.uniforms;

    // Update the time uniform so the shader knows how to animate the noise
    mats.u_time.value = state.clock.elapsedTime;

    // Keep the aspect ratio updated dynamically if the user resizes their browser window
    mats.u_aspect.value = state.size.width / state.size.height;

    // Grab the current mouse coordinates (-1 to +1 range)
    targetMouse.set(state.pointer.x, state.pointer.y);

    mats.u_mouse.value.lerp(targetMouse, mouseFollowDelay);
  });

  return (
    <mesh>
      {/* Create a plane to fill viewport */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}      // Required so the gaps between are transparent
        depthWrite={false}      // Prevents the background from blocking other 3D objects
      />
    </mesh>
  );
}
