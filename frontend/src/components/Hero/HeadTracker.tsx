import { useRef } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import type { Bone } from 'three'

type Props = {
  headBoneRef: RefObject<Bone | null>
}

export function HeadTracker({ headBoneRef }: Props) {
  const { camera, mouse } = useThree()
  const target = useRef(new Vector3())

  useFrame(() => {
    const bone = headBoneRef.current
    if (!bone) return
    // Unproject NDC cursor onto the z=0.5 plane between near and far clip
    // so the head has a world-space point to face.
    target.current.set(mouse.x, mouse.y, 0.5).unproject(camera)
    bone.lookAt(target.current)
  })

  return null
}
