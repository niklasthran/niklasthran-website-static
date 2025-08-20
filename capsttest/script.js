import * as THREE from "three";
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';

const container = document.querySelector("#container");
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

scene.background = new THREE.Color( 0xF2F3F4 );

const ambient = new THREE.AmbientLight("white", 1.0);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xffffff, 10000.0);
pointLight.position.set(0, 30, 30);
//scene.add(pointLight);

//const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});


const material = new THREE.MeshPhysicalMaterial(
	{
		roughness: 0.4,   
		transmission: 1,  
		thickness: 1,
		clearcoat: 1,

	
		transparent: true,
		opacity: 0.5,
		side: THREE.DoubleSide
	}
);

/*
const material = new THREE.MeshLambertMaterial(
	{
		color: Math.random() * 0xffffff
	}
);
*/
const geometry = new THREE.BoxGeometry(30, 30, 1)
let n_geos = 16;
for (let i = 0; i < n_geos; i++){
	const cuboid = new THREE.Mesh(
		geometry,
		//material
		new THREE.MeshPhysicalMaterial(
			{
				roughness: 0.5,   
				transmission: 1.0,  
				thickness: 4,
				ior: 1.3,
				//clearcoat: 1,
		
				color: Math.random() * 0xffffff,

				transparent: true,
				opacity: 0.85,
				side: THREE.DoubleSide
			}
		)
	);

	cuboid.position.set(0, 0, (n_geos / 2 * -5) + i * 5);
	scene.add(cuboid);
}

const aspect = container.clientWidth / container.clientHeight;

const size = 75;
const camera = new THREE.OrthographicCamera(
	(size * aspect) / -2,
	(size * aspect) / 2,
	size / 2,
	size / -2,
	1,
	1000
);
//camera.position.set(-70, -20, -100);
camera.position.set(70, 45, 100);
camera.lookAt(0, 0, 0);

/////////
const gsize = 100;
const divisions = 10;
const gridHelper = new THREE.GridHelper( gsize, divisions );
//scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper(50);
//scene.add( axesHelper );

const pointLightHelper = new THREE.PointLightHelper(pointLight, 4);
//scene.add(pointLightHelper);

//const controls = new OrbitControls( camera, renderer.domElement );
//controls.update();
/////////

function onWindowResize() {
	const newAspect = container.clientWidth / container.clientHeight;

	camera.left = (size * newAspect) / -2;
	camera.right = (size * newAspect) / 2;

	camera.updateProjectionMatrix();

	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
}

renderer.render(scene, camera);
window.addEventListener("resize", onWindowResize);

/*
function render(time) {
	//time *= 0.001; // convert time to seconds

	//cuboid.rotation.x = time;
	//cuboid.rotation.y = time;

	renderer.render(scene, camera);
	//controls.update();

	requestAnimationFrame(render);
}
requestAnimationFrame(render);
*/