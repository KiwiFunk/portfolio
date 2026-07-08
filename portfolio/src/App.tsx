import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
      <Canvas
        orthographic
        camera={{
          position: [5, 5, 5],
          zoom: 150,
          near: -100,
          far: 100,
        }}
      >
        <OrbitControls
          makeDefault
          // Uses Radians. 180 degrees = pi. 360 degrees = 2pi
          // Radians = Degrees * (pi / 180)
          // Up/Down rotation limits
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={Math.PI / 6} // 180 / 6 = 30 degrees
          maxAzimuthAngle={Math.PI / 3} // 180 / 3 = 60 degrees
          // use Zoom for ortho, distance for perspective
          minZoom={45}
          maxZoom={80}
        />
        <Scene />
      </Canvas>
    </div>
  );
}
