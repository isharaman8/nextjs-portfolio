import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { useGLTF, OrbitControls } from '@react-three/drei'

function Computer(props: any) {
    const { scene } = useGLTF('/static/retrocomputer/scene.gltf')
    const elapsedTime = useRef(0)
    const group = useRef<Group>(null)

    useFrame((_state, delta) => {
        elapsedTime.current += delta
        if (!group.current) return
        group.current.rotation.y += elapsedTime.current < 1 ? 0.05 : 0.005
    })

    return (
        <group ref={group}>
            <primitive object={scene} {...props} />
        </group>
    )
}

// Fills its parent; size the wrapping element to size the scene
export default function ThreeComponent() {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [-2.5, 2.5, -2.5], fov: 25 }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={1} />
            <Computer scale={1.7} position={[0, -0.4, 0]} />
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    )
}
