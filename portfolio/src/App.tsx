import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import './App.css'

function App() {

  const { scene } = useGLTF('/FolioScene.glb');

  return (
    <>
      <div id="canvas-container">
        <Canvas >
          <primitive object={scene} />
        </Canvas>
      </div>
    </>
  )
}

export default App
