import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OCType } from "three-stdlib";

export default function CameraControls() {
  const width = useThree((state) => state.size.width);
  const controlsRef = useRef<OCType | null>(null);

  // Helper func to convert degrees to radians
  const degToRad = (deg: number) => deg * (Math.PI / 180);

  useEffect(() => {
    if (!controlsRef.current) return; // If no controller, exit early

    // Set Zoom bounds as percentages of canvas width
    // use Zoom for ortho, distance for perspective
    controlsRef.current.minZoom = width * 0.035;
    controlsRef.current.maxZoom = width * 0.055;
  }, [width]); // Run effect on width change

  return (
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
  );
}
