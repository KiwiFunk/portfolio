import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";

export default function App() {
  // Helper func to convert degrees to radians
  const degToRad = (deg) => deg * (Math.PI / 180);

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
          // Up/Down rotation limits
          minPolarAngle={degToRad(65)}
          maxPolarAngle={degToRad(90)}
          // Left/Right rotation limits
          minAzimuthAngle={degToRad(30)}
          maxAzimuthAngle={degToRad(60)}
          // use Zoom for ortho, distance for perspective
          minZoom={45}
          maxZoom={70}
        />
        <Scene />
      </Canvas>
    </div>
  );
}
