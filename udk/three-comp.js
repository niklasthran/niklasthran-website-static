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
import {GLTFLoader} from './three/examples/jsm/loaders/GLTFLoader.js';
import {EXRLoader} from './three/examples/jsm/loaders/EXRLoader.js';



new EXRLoader().load('./assets/colors4.exr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.background = texture;
    scene.environment = texture;
});

const gltfLoader = new GLTFLoader();
let mixer = null;

gltfLoader.load('./assets/models/Coins/Coins.gltf', (gltf) => {
        console.log('success');
        console.log(gltf);
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    },

    (progress) => {
        console.log('progress')
        console.log(progress)
    },

    (error) => {
        console.log('error')
        console.log(error)
    }
);

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector('canvas.three-comp');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
const tick = () => {
    if(mixer) {
        mixer.update(clock.getDelta());
    }

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})