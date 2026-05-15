import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Bone } from 'three'
import { Character } from './components/Hero/Character'
import { HeadTracker } from './components/Hero/HeadTracker'
import { AimCameraAtHead } from './components/Hero/AimCameraAtHead'
import { useIsMobile } from './hooks/useIsMobile'

const FALLBACK_IMAGE = '/character-fallback.png'

export default function App() {
  const isMobile = useIsMobile()
  const headBoneRef = useRef<Bone | null>(null)

  if (isMobile) {
    // No <Canvas> on coarse-pointer devices — saves WebGL context, GPU
    // memory, and battery for visitors who can't drive head tracking anyway.
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <img
          src={FALLBACK_IMAGE}
          alt=""
          aria-hidden="true"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 1.5, 3], fov: 28 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <Suspense fallback={null}>
          <Character headBoneRef={headBoneRef} />
        </Suspense>
        <AimCameraAtHead headBoneRef={headBoneRef} />
        <HeadTracker headBoneRef={headBoneRef} />
      </Canvas>
    </div>
  )
}
