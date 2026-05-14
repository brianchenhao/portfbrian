import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

// Converts the cursor (NDC -1..1) into a world-space point on the z=0.5
// near/far interpolation plane. Step 7 will rotate the head bone toward it.
export function HeadTracker() {
  const { camera, mouse } = useThree()
  const target = useRef(new Vector3())
  const frame = useRef(0)

  useFrame(() => {
    target.current.set(mouse.x, mouse.y, 0.5).unproject(camera)
    frame.current += 1
    if (frame.current % 30 === 0) {
      const t = target.current
      console.log(
        '[head-tracker] target=',
        t.x.toFixed(2),
        t.y.toFixed(2),
        t.z.toFixed(2),
      )
    }
  })

  return null
}
