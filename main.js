import "./style.css";

import * as THREE from "three";

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
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});

// 3- step Mesh - geometry + materail
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
