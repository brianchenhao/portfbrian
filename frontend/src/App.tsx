import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Character } from './components/Hero/Character'

export default function App() {
  return (
    <div className="scene-host">
      <Canvas camera={{ position: [0, 1.5, 3], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <Suspense fallback={null}>
          <Character />
        </Suspense>
      </Canvas>
    </div>
  )
}
