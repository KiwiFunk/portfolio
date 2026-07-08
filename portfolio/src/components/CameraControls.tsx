import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three";

import type { OrbitControls as OCType } from "three-stdlib";

// Limits (calculate outside of loop to avoid re-calculation on every render)
const minPolar = THREE.MathUtils.degToRad(65);
const maxPolar = THREE.MathUtils.degToRad(90);
const minAzimuth = THREE.MathUtils.degToRad(30);
const maxAzimuth = THREE.MathUtils.degToRad(60);

export default function CameraControls() {
  const width = useThree((state) => state.size.width);
  const controlsRef = useRef<OCType | null>(null);

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
      minPolarAngle={minPolar}
      maxPolarAngle={maxPolar}
      // Left/Right rotation limits
      minAzimuthAngle={minAzimuth}
      maxAzimuthAngle={maxAzimuth}
    />
  );
}
