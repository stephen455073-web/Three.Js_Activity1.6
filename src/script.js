import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Cylinder geometry 
const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32)
const material = new THREE.MeshStandardMaterial({ color: 0x4fc3f7 })
const cylinder = new THREE.Mesh(geometry, material)
scene.add(cylinder)

// Add some light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 2)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize handling
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

// Fullscreen toggle on double click
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
            canvas.requestFullscreen()
        else if(canvas.webkitRequestFullscreen)
            canvas.webkitRequestFullscreen()
    }
    else
    {
        if(document.exitFullscreen)
            document.exitFullscreen()
        else if(document.webkitExitFullscreen)
            document.webkitExitFullscreen()
    }
})

// Animate
const tick = () =>
{
    cylinder.rotation.y += 0.01
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
