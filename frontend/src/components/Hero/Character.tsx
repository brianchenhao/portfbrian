import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import type { Object3D } from 'three'

const MODEL_URL = '/character.glb'

export function Character() {
  const { scene } = useGLTF(MODEL_URL)

  useEffect(() => {
    const bones: string[] = []
    scene.traverse((o: Object3D) => {
      // three's Bone class flags itself with isBone; keep the cast narrow
      if ((o as Object3D & { isBone?: boolean }).isBone) bones.push(o.name)
    })
    console.log('[character] bones:', bones)
  }, [scene])

  return <primitive object={scene} />
}

useGLTF.preload(MODEL_URL)
