import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// for 3d app we need 3 objects: scene, camera, renderer
const scene = new THREE.Scene();

//most used is perspectiveCamera(), the first argument is field of view, the second is aspect ration(which is based off of the user's browser window), the third argument is view frustum

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//renderer does the magic. The renderer needs to know which DOM element to use
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// create an object, have 3 steps
// 1-step Geometry - the {x, y, z} points that makeup a shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// 2-step Material - the wrapping paper for an object
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

// 3- step Mesh - geometry + materail
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //randomly generate x. y, x values for stars
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//for example we want 200 randomly positioned stars
Array(200).fill().forEach(addStar);

//space background
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

//Avatar
//load a picture
const smileyTexture = new THREE.TextureLoader().load("smiley.png");

//create 3d Box Geometry
const smiley = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: smileyTexture })
);

scene.add(smiley);

//another object, Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonTexture,
  })
);

scene.add(moon);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
