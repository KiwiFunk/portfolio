import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import type { OrbitControls as OCType } from "@react-three/drei";

import Scene from "./Scene";

export default function App() {
  // https://r3f.docs.pmnd.rs/api/hooks#usethree
  const width = useThree((state) => state.size.width);
  const controlsRef = useRef<OCType | null>(null);

  // Helper func to convert degrees to radians
  const degToRad = (deg) => deg * (Math.PI / 180);

  useEffect(() => {
    if (!controlsRef.current) return;
    // Set Zoom bounds as percentages of canvas width
    // use Zoom for ortho, distance for perspective
    controlsRef.current.minZoom = width * 0.25;
    controlsRef.current.maxZoom = width * 1.25;
  }, [width]); // Run effect on width change

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
      <Canvas orthographic camera={{ near: -100, far: 100 }}>
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan={false}

          // Up/Down rotation limits
          minPolarAngle={degToRad(65)}
          maxPolarAngle={degToRad(90)}
          // Left/Right rotation limits
          minAzimuthAngle={degToRad(30)}
          maxAzimuthAngle={degToRad(60)}
        />
        <Scene />
      </Canvas>
    </div>
  );
}
