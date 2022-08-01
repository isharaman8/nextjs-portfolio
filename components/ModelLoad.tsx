import { useEffect, useRef, useState } from 'react'
import { AnimationClip, Object3D } from 'three'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '@react-three/fiber'
import { Html } from 'next/document'

export default function ModelLoad() {
    const textRef = useRef<HTMLHeadingElement>(null)
    const group = useRef<any>()
    const actions = useRef<any>()
    const [model, setModel] = useState<Object3D | null>(null)
    const [animation, setAnimation] = useState<AnimationClip[] | null>(null)
    const [mixer] = useState(() => new THREE.AnimationMixer(null))
    // useEffect(() => {
    // 	init(textRef.current, {
    // 		showCursor: true,
    // 		backDelay: 1500,
    // 		strings: ["Web_Developer"],
    // 	});
    // });

    useEffect(() => {
        const loader = new GLTFLoader()
        loader.load('/static/One-line-cube/scene.gltf', async (gltf) => {
            const nodes = await gltf.parser.getDependencies('node')
            // const animations = await gltf.parser.getDependencies('animation')
            // console.log('animations', animations)
            setModel(nodes[0])
            // setAnimation(animations)
        })
    }, [])

    // useEffect(() => {
    //     if (animation && typeof group.current != 'undefined') {
    //         actions.current = {
    //             idle: mixer.clipAction(animation[0], group.current as Object3D),
    //         }
    //         actions.current.idle.play()
    //         return animation.forEach((clip) => mixer.uncacheClip(clip))
    //     }
    // }, [])

    useFrame((_, delta) => mixer.update(delta))
    useFrame(() => {
        if (typeof group.current != 'undefined') {
            return (group.current.rotation.y += 0.01)
        }
    })

    return (
        <>
            {model ? (
                <group ref={group} position={[0, -150, 0]} dispose={null}>
                    <primitive
                        ref={group}
                        name="Object_0"
                        object={model}
                    ></primitive>
                </group>
            ) : (
                <Html>Loading...</Html>
            )}
        </>
    )
}
