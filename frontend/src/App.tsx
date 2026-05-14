import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Bone } from 'three'
import { Character } from './components/Hero/Character'
import { HeadTracker } from './components/Hero/HeadTracker'

export default function App() {
  const headBoneRef = useRef<Bone | null>(null)
  return (
    <div className="scene-host">
      <Canvas camera={{ position: [0, 1.5, 3], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <Suspense fallback={null}>
          <Character headBoneRef={headBoneRef} />
        </Suspense>
        <HeadTracker headBoneRef={headBoneRef} />
      </Canvas>
    </div>
  )
}
