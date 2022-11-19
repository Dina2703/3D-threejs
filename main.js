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

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
