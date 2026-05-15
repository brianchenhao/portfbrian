import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Bone } from 'three'
import { Character } from './components/Hero/Character'
import { HeadTracker } from './components/Hero/HeadTracker'
import { AimCameraAtHead } from './components/Hero/AimCameraAtHead'
import { useIsMobile } from './hooks/useIsMobile'
import { Nav } from './components/Nav'

const FALLBACK_IMAGE = '/character-fallback.png'

const PLACEHOLDER_SECTIONS = [
  'about',
  'skills',
  'projects',
  'experience',
  'certifications',
  'extracurriculars',
  'references',
] as const

export default function App() {
  const isMobile = useIsMobile()
  const headBoneRef = useRef<Bone | null>(null)

  return (
    <>
      <Nav />
      <main>
        <section id="hero" className="h-screen w-full">
          {isMobile ? (
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={FALLBACK_IMAGE}
                alt=""
                aria-hidden="true"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <Canvas camera={{ position: [0, 1.5, 3], fov: 28 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.9} />
              <Suspense fallback={null}>
                <Character headBoneRef={headBoneRef} />
              </Suspense>
              <AimCameraAtHead headBoneRef={headBoneRef} />
              <HeadTracker headBoneRef={headBoneRef} />
            </Canvas>
          )}
        </section>

        {/* Placeholder sections — each Phase 2 step fills one in. */}
        {PLACEHOLDER_SECTIONS.map((id) => (
          <section
            key={id}
            id={id}
            className="min-h-[60vh] border-t border-border px-6 py-16"
          >
            <h2 className="text-xs uppercase tracking-widest text-fg-muted">
              {id}
            </h2>
          </section>
        ))}
      </main>
    </>
  )
}
