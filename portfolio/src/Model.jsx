import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { scene } = useGLTF("/assets/FolioScene.glb");

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/assets/FolioScene.glb");
