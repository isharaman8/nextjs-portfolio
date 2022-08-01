import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Canvas, useFrame } from '@react-three/fiber'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { AnimationClip, Object3D } from 'three'
import ModelLoad from '../components/ModelLoad'
// import { init } from "ityped";

// const loader = new GLTFLoader()
// const scene = new THREE.Scene()

// loader.load('/static/One-line-cube/scene.gltf', (gltf: any) => {
//     scene.add(gltf.scene)
// })

const Home: NextPage = () => {
    const textRef = useRef<HTMLHeadingElement>(null)
    const refBody = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [renderer, setRenderer] = useState<any>()
    const [_camera, setCamera] = useState<any>()
    const [target] = useState(new THREE.Vector3(-0.2, 1.2, 0))
    const [initialCameraPosition] = useState(
        new THREE.Vector3(
            20 * Math.sin(0.2 * Math.PI),
            6 * Math.cos(0.2 * Math.PI),
            0.3 * Math.PI
        )
    )
    const [scene] = useState(new THREE.Scene())
    const [_controls, setControls] = useState<any>()

    const easeOutCirc = (x: number) => {
        return Math.sqrt(x - Math.pow(x - 1, 4))
    }

    useEffect(() => {
        const { current: container } = refBody
        if (container && !renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            const renderer = new THREE.WebGLRenderer({
                antialias: false,
                alpha: true,
            })

            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(scW, scH)
            renderer.outputEncoding = THREE.sRGBEncoding
            container.appendChild(renderer.domElement)
            setRenderer(renderer)

            const scale = scH * 0.08 + 4

            const camera = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale / 2,
                -100,
                9000
            )
            camera.position.copy(initialCameraPosition)
            camera.lookAt(target)
            setCamera(camera)
            setCamera(camera)

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)

            scene.add(ambientLight)

            const spotLight = new THREE.SpotLight(0xffffff)
            spotLight.position.set(-40, 60, -10)

            spotLight.castShadow = true

            scene.add(spotLight)

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.autoRotate = true
            controls.target = target

            setControls(controls)

            loadGLTFModel(scene, 'static/retrocomputer/scene.gltf', {
                receiveShadow: true,
                castShadow: true,
            }).then(() => {
                animate()
                setLoading(false)
            })

            //const geometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10)
            // const material = new THREE.MeshStandardMaterial({
            //    color: 0x00000,
            //    metalness: 10,
            //    roughness: 1,
            // })
            // const cube = new THREE.Mesh(geometry, material)
            // const geometry = new THREE.TorusKnotGeometry(20, 5, 100, 16)
            // const material = new THREE.MeshStandardMaterial({
            //     color: 0x000000,
            //     wireframe: true,
            //     roughness: 5,
            // })
            // const torusKnot = new THREE.Mesh(geometry, material)
            // torusKnot.position.y = 20
            // scene.add(torusKnot)

            let req: any = null
            let frame = 0
            const animate = () => {
                req = requestAnimationFrame(animate)
                frame = frame <= 100 ? frame + 1 : frame

                // if (frame <= 100) {
                //     const p = initialCameraPosition
                //     const rotSpeed = easeOutCirc(frame / 120) * Math.PI * 20
                //     camera.position.y = 10
                //     camera.position.x =
                //         p.x * Math.cos(rotSpeed) + p.z + Math.sin(rotSpeed)
                //     camera.position.z =
                //         p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
                //     camera.lookAt(target)
                // } else {
                //     controls.update()
                // }

                controls.update()

                renderer.render(scene, camera)
            }

            animate()
            setLoading(false)
        }

        return () => {}
    }, [])

    // const group = useRef<any>()
    // const actions = useRef<any>()
    // const [model, setModel] = useState<Object3D | null>(null)
    // const [animation, setAnimation] = useState<AnimationClip[] | null>(null)
    // const [mixer] = useState(() => new THREE.AnimationMixer(null))
    // useEffect(() => {
    // 	init(textRef.current, {
    // 		showCursor: true,
    // 		backDelay: 1500,
    // 		strings: ["Web_Developer"],
    // 	});
    // });

    // useEffect(() => {
    //     const loader = new GLTFLoader()
    //     loader.load('/static/One-line-cube/scene.gltf', async (gltf) => {
    //         const nodes = await gltf.parser.getDependencies('node')
    //         const animations = await gltf.parser.getDependencies('animation')
    //         setModel(nodes[0])
    //         setAnimation(animations)
    //     })
    // }, [])

    // useEffect(() => {
    //     if (animation && typeof group.current != 'undefined') {
    //         actions.current = {
    //             idle: mixer.clipAction(animation[0], group.current as Object3D),
    //         }
    //         actions.current.idle.play()
    //         return animation.forEach((clip) => mixer.uncacheClip(clip))
    //     }
    // }, [animation])

    // // useFrame((_, delta) => mixer.update(delta))
    // // useFrame(() => {
    // //     if (typeof group.current != 'undefined') {
    // //         return (group.current.rotation.y += 0.01)
    // //     }
    // // })

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                >
                    <h1 className={styles.greeting}>Hi There</h1>
                    <h1 className={styles?.nameh1}>I'm Aman Kumar</h1>
                    <h1 className={styles?.jbProfile}>
                        Full Stack Web Developer
                    </h1>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ textAlign: 'center', fontWeight: '400' }}
                    >
                        A computer enthusiast who loves creating websites and
                        exploring emerging web technologies.
                    </Typography>
                    {/* <h1 ref={textRef}></h1> */}
                </Box>

                {/* <img
                    style={{
                        zIndex: 5,
                        flex: 1,
                        width: '100%',
                        height: 'auto',
                    }}
                    src="https://c.tenor.com/NOYF3f82b_gAAAAC/programmer.gif"
                    alt="coding gif"
                /> */}
                {/* <canvas id="myCanva"></canvas> */}
                {/* <Canvas
                    shadows={true}
                    className={styles.canvas}
                    camera={{
                        position: [-6, 7, 7],
                    }}
                >
                    <ModelLoad />
                </Canvas> */}
                <Box
                    ref={refBody}
                    sx={{
                        height: '600px',
                        width: '600px',
                        justifyContent: 'center',
                        overflowY: `hidden`,
                        alignItems: 'center',
                        flex: 0.7,
                        // border: `1px solid black`,
                        marginRight: 20,
                    }}
                ></Box>
            </main>
        </div>
    )
}

export default Home
