import { Center } from "@react-three/drei";
import Model from "./Model";

export default function Scene() {
  return (
    <>
      {/* Basic Lights - Move to Lights.jsx for full  */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      {/* Use Suspense in future if adding loading state  */}
      <Center>
        <Model />
      </Center>
    </>
  );
}
