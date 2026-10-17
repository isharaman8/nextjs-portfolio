import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { useGLTF, OrbitControls } from '@react-three/drei'

function easeOutCirc(x: number) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}

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

export default function ThreeComponent(props: any) {
    const [pcSize, setpcSize] = useState<number>(1.8)
    const [canvasSize, setCanvasSize] = useState<string>(`400px`)

    const handleResize = () => {
        if (window.innerWidth < 900) {
            setpcSize(1.4)
            setCanvasSize(`300px`)
        } else {
            setpcSize(1.8)
            setCanvasSize(`400px`)
        }
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handleResize()
        window.addEventListener(`resize`, handleResize, false)
        return () => {
            window.removeEventListener(`resize`, handleResize, false)
        }
    }, [])
    return (
        <Canvas
            gl={{ antialias: true }}
            camera={{ position: [-2.5, 2.5, -2.5], fov: 25 }}
            style={{
                height: canvasSize,
                width: `420px`,
                marginTop: 100,
            }}
        >
            <ambientLight intensity={1} />
            <Computer
                scale={pcSize}
                rotation={[0, 0, 0]}
                position={[0, -0.4, 0]}
            />

            <OrbitControls />
        </Canvas>
    )
}
