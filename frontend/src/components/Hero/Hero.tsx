import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Bone } from 'three'
import { Character } from './Character'
import { HeadTracker } from './HeadTracker'
import { AimCameraAtHead } from './AimCameraAtHead'
import { useIsMobile } from '../../hooks/useIsMobile'
import { about } from '../../data/about'
import { profile } from '../../data/profile'

const FALLBACK_IMAGE = '/character-fallback.png'

export function Hero() {
  const isMobile = useIsMobile()
  const headBoneRef = useRef<Bone | null>(null)

  return (
    <section id="hero" className="relative w-full">
      {/* The hero owns the first viewport. Below md the layout stacks so the
       * canvas sits under the intro — phones can't track a cursor anyway and
       * see the PNG fallback instead. */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-stretch gap-10 px-6 py-20 md:flex-row md:items-center md:gap-12 md:py-0">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">
            {profile.role}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-fg md:text-5xl">
            {profile.name}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-fg-muted">
            {about.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Connect on LinkedIn
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              See projects
            </a>
          </div>
        </div>

        <div className="relative h-[55vh] w-full md:h-screen md:w-1/2">
          {isMobile ? (
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={FALLBACK_IMAGE}
                alt=""
                aria-hidden="true"
                className="scene-fallback max-h-full max-w-full object-contain"
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
        </div>
      </div>
    </section>
  )
}
