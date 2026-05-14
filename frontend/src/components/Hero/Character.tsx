import { useGLTF } from '@react-three/drei'

const MODEL_URL = '/character.glb'

export function Character() {
  const { scene } = useGLTF(MODEL_URL)
  return <primitive object={scene} />
}

useGLTF.preload(MODEL_URL)
