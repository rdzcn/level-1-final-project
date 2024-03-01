import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import GUI from 'lil-gui'
import { loadingManager } from "./loadingManager"
import gsap from "gsap"

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Environment map
const rgbeLoader = new RGBELoader(loadingManager)
const fontLoader = new FontLoader()

rgbeLoader.load(
  "/environment/kloppenheim_06_puresky_2k.hdr",
  (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;

    fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        // Material
      const material = new THREE.MeshNormalMaterial()
      
        // Text
        const firstTextGeometry = new TextGeometry(
            'Say whaaaat!?',
            {
                font: font,
                size: 0.7,
                height: 0.7,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.04,
                bevelOffset: 0,
                bevelSegments: 10
            }
        )
        const secondTextGeometry = new TextGeometry(
            'This is awesome!',
            {
                font: font,
                size: 0.7,
                height: 0.7,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.04,
                bevelOffset: 0,
                bevelSegments: 10
            }
          )
        firstTextGeometry.center()
        secondTextGeometry.center()
      
        const firstText = new THREE.Mesh(firstTextGeometry, material)
        const secondText = new THREE.Mesh(secondTextGeometry, material)
        firstText.material.transparent = true
        firstText.material.opacity = 0.2
        scene.add(firstText, secondText)
      
        gsap.to(firstText.material, { opacity: 1, duration: 5 })
        firstText.position.y = 1.2
        gsap.to(camera.position, { x: 2, y: 2, z: 10, duration: 2, ease: "power1.out" })
      
        // Donuts
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)
        const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.1, 50, 20, 2, 3 ); 

        for (let i = 0; i < 100; i++) {
            const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
            torusKnot.position.x = (Math.random() - 0.5) * 20 
            torusKnot.position.y = (Math.random() - 0.5) * 20
            torusKnot.position.z = (Math.random() - 0.5) * 20
            torusKnot.rotation.x = Math.random() * Math.PI
            torusKnot.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            torusKnot.scale.set(scale / 5, scale / 5, scale / 5)
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 20 
            donut.position.y = (Math.random() - 0.5) * 20
            donut.position.z = (Math.random() - 0.5) * 20
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            // const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(torusKnot, donut)
        }
      
      }
      )
    
})


/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()
// const matcapTexture = textureLoader.load('textures/matcaps/8.png')
// matcapTexture.colorSpace = THREE.SRGBColorSpace




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('keydown', (event) => {
  if(event.key == 'h')
    gui.show(gui._hidden)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 120
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()