import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);
renderer.render(scene, camera)

const geometry =  new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color:800080})
const torus = new THREE.Mesh(geometry, material)


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color:0xffffff})
    const star = new THREE.Mesh(geometry, material )
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

star.position.set(x, y, z)
scene.add(star)
  }

  
  const spaceTexture = new THREE.TextureLoader().load('one.jpg')
  scene.background = spaceTexture

  const TychusTexture = new THREE.TextureLoader().load('Tychus.jpg');
  const tychus = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:TychusTexture})
  )

  const ringTexture = new THREE.TextureLoader().load('ring.png')
const ring = new THREE.Mesh(
new THREE.SphereGeometry(3, 32, 32),
new THREE.MeshStandardMaterial({map:ringTexture})

)
scene.add(ring)


scene.add(tychus)

Array(200).fill().forEach(addStar)

scene.add(torus)




function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01

  controls.update()


  renderer.render(scene, camera)
}

animate()