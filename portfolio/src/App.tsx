import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import './App.css'

import Scene from './Scene.tsx'

function App() {


  return (
    <>
      <Scene />
    </>
  )
}

export default App
