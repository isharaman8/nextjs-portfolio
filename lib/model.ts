import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function loadGLTFModel(
    scene: any,
    glbPath: any,
    options = { receiveShadow: true, castShadow: true }
) {
    const { receiveShadow, castShadow } = options
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()

        loader.load(
            glbPath,
            (gltf) => {
                const obj = gltf.scene
                obj.name = 'dog'
                // obj.position.setX(-100)
                obj.position.y = -10
                obj.position.x = 0
                obj.receiveShadow = receiveShadow
                obj.castShadow = castShadow
                obj.scale.x = 90
                obj.scale.y = 90
                obj.scale.z = 90
                scene.add(obj)

                obj.traverse(function (child: any) {
                    if (child.isMesh) {
                        child.castShadow = castShadow
                        child.receiveShadow = receiveShadow
                    }
                })
                resolve(obj)
            },
            undefined,
            function (error) {
                reject(error)
            }
        )
    })
}
