import { useState } from "react";
import { useCursor } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import FolioScene from "./FolioScene";

// NAMES MUST MATCH NAME ATTRIBUTES IN THE GLTF FILE
const ASSET_LINKS: Record<string, string> = {
  Artstation: "https://www.artstation.com/kiwifunk",
  GitHub: "https://github.com/KiwiFunk",
  LinkedIn: "https://www.linkedin.com/in/kiwifunk/",
};

// Set proper TS type for props to avoid "any" type errors
export default function Model(props: any) {
  // Track name attr of the currently hovered asset (or null if none)
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  // Show pointer if interacting with a click asset
  useCursor(hoveredAsset !== null);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    // Fetch name attr of target
    const meshName = e.object.name;

    // Check for name in dict
    const targetUrl = ASSET_LINKS[meshName];
    if (targetUrl) {
      console.log(`Navigating to ${targetUrl}...`);
      // window.location.href = targetUrl;
    }
  };

  return (
    <group {...props}>
      <FolioScene
        onAssetClick={handleClick}

        // Pass the name of the object being hovered UP to this file
        onAssetOver={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();    // Prevent event from bubbling up to parent meshes
          setHoveredAsset(e.object.name);
        }}
        onAssetOut={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          setHoveredAsset(null);
        }}

        // Pass the currently hovered string DOWN to the scene
        hoveredAsset={hoveredAsset}
      />
    </group>
  );
}
