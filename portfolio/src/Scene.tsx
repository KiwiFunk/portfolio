import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  Environment,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";

import Model from "./Model";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [3, 2, 6],
        fov: 40,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          castShadow
        />

        <Environment preset="city" />

        <Model scale={1} />

        <ContactShadows
          opacity={0.4}
          blur={2}
          far={5}
        />

        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
