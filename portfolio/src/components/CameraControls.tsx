import { useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three";

import type { OrbitControls as OCType } from "three-stdlib";

// Limits (calculate outside of loop to avoid re-calculation on every render)
const minPolar = THREE.MathUtils.degToRad(65);
const maxPolar = THREE.MathUtils.degToRad(90);
const minAzimuth = THREE.MathUtils.degToRad(30);
const maxAzimuth = THREE.MathUtils.degToRad(60);

export default function CameraControls() {
  const width = useThree((state) => state.size.width);
  const controlsRef = useRef<OCType | null>(null);
  const [isControlling, setIsControlling] = useState(false);

  // useFrame runs every frame in three, and handles delta time
  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (!controls || isControlling) return;

    // R3F supplies normalized mouse coordinates in the range -1, 1
    const { pointer, camera } = state;

    // https://threejs.org/docs/?q=mapLinear#global.mapLinear
    const targetAzimuth = THREE.MathUtils.mapLinear(
      pointer.x,          // Value to map
      1,                  // Min A
      -1,                 // Max A
      minAzimuth,         // Min B
      maxAzimuth,         // Max B
    );

    const targetPolar = THREE.MathUtils.mapLinear(
      pointer.y,
      -1,
      1,
      maxPolar,
      minPolar,
    );

    // Convert current camera position to spherical coordinates relative to the controls target
    const spherical = new THREE.Spherical().setFromVector3(
      camera.position.clone().sub(controls.target),
    );

    // Use damp instead of lerp for frame-rate independent smoothing
    const smoothSpeed = 4;
    spherical.theta = THREE.MathUtils.damp(
      spherical.theta,
      targetAzimuth,
      smoothSpeed,
      delta,
    );
    spherical.phi = THREE.MathUtils.damp(
      spherical.phi,
      targetPolar,
      smoothSpeed,
      delta,
    );
    spherical.makeSafe();

    // Apply calculated coords to camera
    camera.position.setFromSpherical(spherical).add(controls.target);
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}

      // Up/Down rotation limits
      minPolarAngle={minPolar}
      maxPolarAngle={maxPolar}
      // Left/Right rotation limits
      minAzimuthAngle={minAzimuth}
      maxAzimuthAngle={maxAzimuth}

      // use Zoom for ortho, distance for perspective
      minZoom={width * 0.035}
      maxZoom={width * 0.055}

      // Handle user interaction
      onStart={() => setIsControlling(true)}
      onEnd={() => setTimeout(() => setIsControlling(false), 100)}
    />
  );
}
