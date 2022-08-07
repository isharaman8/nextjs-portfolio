import { Canvas, useFrame } from '@react-three/fiber'
import {
    useGLTF,
    Environment,
    OrbitControls,
    Plane,
    Box,
} from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { truncateSync } from 'fs'
// import * as THREE from 'three'

function easeOutCirc(x: number) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}

function Computer(props: any) {
    const { scene } = useGLTF('/static/retrocomputer/scene.gltf')

    useFrame(() => {
        scene.rotation.y += 0.005
    })

    return <primitive object={scene} {...props} />
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
        window.addEventListener(`resize`, handleResize, false)
        return () => {
            window.removeEventListener(`resize`, handleResize, false)
        }
    }, [])

    useEffect(() => {
        handleResize()
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
            // colorManagement
            // shadowMap
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
