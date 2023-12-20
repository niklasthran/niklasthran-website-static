/*
three-comp.js
Niklas Thran
Fundamentals of 3D – Prati
M.A. VK
Berlin University of the Arts
*/

//========================================================================

import * as THREE from "three";
import {OrbitControls} from "./three/examples/jsm/controls/OrbitControls.js";

// SCENE + CANVAS
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const canvas =  document.querySelector('canvas.three-comp');
const renderer = new THREE.WebGLRenderer({canvas: canvas});

// CAMERA
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//GEOMETRY
const geometry = new THREE.TorusGeometry(1.2, 0.05, 128, 128, 10);

// TEXTURE
const material = new THREE.MeshMatcapMaterial();
const matcapTexture = new THREE.TextureLoader().load("./assets/matcap_512x512.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
material.matcap = matcapTexture;

// GEOMETRY + TEXTURE = MESH
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// DEBUGGING
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// CTRL
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// INITAL RENDER
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//========================================================================

// TIME & ANIMATION
const clock = new THREE.Clock();

const update = () =>
{   
    const elapsedTime = clock.getElapsedTime();

    // Render and recursion
    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
};

//========================================================================

update();

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});