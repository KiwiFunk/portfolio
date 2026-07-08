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
        <OrbitControls makeDefault />
        <Scene />
      </Canvas>
    </div>
  );
}
