import { useRef } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Euler, MathUtils, Object3D, Quaternion, Vector3 } from 'three'
import type { Bone } from 'three'

const YAW_LIMIT = MathUtils.degToRad(45)
const PITCH_LIMIT = MathUtils.degToRad(20)
const SLERP_FACTOR = 0.12

type Props = {
  headBoneRef: RefObject<Bone | null>
}

export function HeadTracker({ headBoneRef }: Props) {
  const { camera, mouse } = useThree()

  // Scratch buffers — reuse every frame so the GC isn't churned on every tick.
  const restLocal = useRef<Quaternion | null>(null)
  const dummy = useRef(new Object3D())
  const worldTarget = useRef(new Vector3())
  const parentWorldInv = useRef(new Quaternion())
  const desiredLocal = useRef(new Quaternion())
  const restInv = useRef(new Quaternion())
  const delta = useRef(new Quaternion())
  const finalLocal = useRef(new Quaternion())
  const euler = useRef(new Euler(0, 0, 0, 'YXZ'))

  useFrame(() => {
    const bone = headBoneRef.current
    if (!bone) return

    // Capture the rig's authored head rotation on the first frame so the
    // yaw/pitch clamps mean "how far the head turns from rest", not "from
    // world identity" — otherwise the clamp window would be measured against
    // a default that doesn't match how the model was authored.
    if (!restLocal.current) {
      restLocal.current = bone.quaternion.clone()
    }

    worldTarget.current.set(mouse.x, mouse.y, 0.5).unproject(camera)

    // lookAt on a dummy at the bone's world position gives us the world-space
    // rotation that would point the head at the cursor, without mutating the
    // bone we're about to slerp toward it.
    bone.getWorldPosition(dummy.current.position)
    dummy.current.up.set(0, 1, 0)
    dummy.current.lookAt(worldTarget.current)

    // Move that world rotation into the bone's parent-local space, which is
    // where bone.quaternion lives.
    if (bone.parent) {
      bone.parent.getWorldQuaternion(parentWorldInv.current).invert()
      desiredLocal.current
        .copy(parentWorldInv.current)
        .multiply(dummy.current.quaternion)
    } else {
      desiredLocal.current.copy(dummy.current.quaternion)
    }

    // Express the desired pose as a delta from rest so the clamp is applied
    // in a frame where (0,0,0) means "neutral head".
    restInv.current.copy(restLocal.current).invert()
    delta.current.copy(restInv.current).multiply(desiredLocal.current)

    // YXZ order: yaw first (Y), then pitch (X). Zero roll so the head
    // never tilts sideways even if the cursor is in a weird corner.
    euler.current.setFromQuaternion(delta.current, 'YXZ')
    euler.current.y = MathUtils.clamp(euler.current.y, -YAW_LIMIT, YAW_LIMIT)
    euler.current.x = MathUtils.clamp(euler.current.x, -PITCH_LIMIT, PITCH_LIMIT)
    euler.current.z = 0
    delta.current.setFromEuler(euler.current)

    // Rebuild the bone-local target and ease toward it. At 60 fps, 0.12
    // converges in ~25 frames (~0.4 s) — organic, not snappy.
    finalLocal.current.copy(restLocal.current).multiply(delta.current)
    bone.quaternion.slerp(finalLocal.current, SLERP_FACTOR)
  })

  return null
}
