import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(5, 5, 5);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

//texture start

const duoTexture = new THREE.TextureLoader().load("duo.jpg");

const duo = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: duoTexture })
);
scene.add(duo);

const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture, texture: normalTexture })
);
scene.add(earth);
earth.position.z = -30;
earth.position.setX(10);

duo.position.z = -5;
duo.position.x = 10;
//texture end

//turbine

// const loader = new GLTFLoader();

// turbineLoader.load("./turbine/turbine.gltf", function (gltf) {
//   // Mesh = gltf.scene;
//   // Mesh.scale.set(0.0002, 0.0002, 0.0002);
//   // scene.add(Mesh);
//   // Mesh.position.x = 0;
//   // Mesh.position.y = 10;
//   // Mesh.position.z = 15;

//   scene.add(gltf.scene);
// });

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  duo.rotation.y += 0.01;
  duo.rotation.z += 0.01;

  camera.position.z = t * -0.05;
  camera.position.x = t * -0.02;
  camera.rotation.y = t * -0.02;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  earth.rotation.x = 0.005;

  controls.update();

  renderer.render(scene, camera);
  // console.log(GLTFLoader);
}

// loadGLTF();
animate();
