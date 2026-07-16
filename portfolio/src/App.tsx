import { Canvas } from "@react-three/fiber";

import Nav from "./components/Nav";
import CameraControls from "./components/CameraControls";
import Scene from "./Scene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
      <Nav />
      <Canvas orthographic camera={{ near: -100, far: 100 }}>
        <CameraControls />
        <Scene />
      </Canvas>
    </div>
  );
}
