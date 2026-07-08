import { Suspense } from "react";
import { Center } from "@react-three/drei";
import Model from "./Model";

export default function Scene() {
  return (
    <>
      {/* Basic lighting just to see the model's textures */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      {/* Suspense catches the model while it loads so the app doesn't crash */}
      <Suspense fallback={null}>
        <Center>
          <Model />
        </Center>
      </Suspense>
    </>
  );
}
