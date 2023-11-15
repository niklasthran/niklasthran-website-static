/*
session_4
Niklas Thran
Fundamentals of 3D – Davide Prati
15.11.2023
*/

//========================================================================

/*
DEFINING SCENE & DIMENSIONS
THREE.Scene() is an object that is
already containing 3D space
*/
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

scene.background = new THREE.Color(0x777777);

/*
DEFINING CAMERA
PerspectiveCamera(frustum_val, aspect ratio);
Frustum value is in degree, default is 50°
*/
//const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
//camera.position.z = 3;

let x = 500;
camera = new THREE.OrthographicCamera(window.innerWidth / -x, window.innerWidth / x, window.innerHeight / x, window.innerHeight / -x, -x, x * 2);

/*
OBJECT (Geometry Geom + Material Mat = Mesh)
BoxGeometry(X, Y, Z)
More Geom: https://threejs.org/docs/index.html?q=geometries
*/
const geo_arc_C = new THREE.TorusGeometry(1.2, 0.01, 128, 128, 10);

// More Mat: https://threejs.org/docs/index.html?q=materials
const material = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF});

// Mesh(Geom, Mat)
const mesh_arc_C = new THREE.Mesh(geo_arc_C, material);

/*
AMBIENT LIGHT
*/
const color = 0xFFFFFF;
const intensity = 0.1;
const ambient_light = new THREE.AmbientLight(color, intensity);

/*
POINT LIGHT
*/
const point_light_W = new THREE.PointLight(0xFFFFFF, 5, 0);
point_light_W.position.set(0, 2, 0.55);

const point_light_R = new THREE.PointLight(0xFF0000, 20, 0);
point_light_R.position.set(-2, 2, 1);

const point_light_G = new THREE.PointLight(0x00FF00, 20, 0);
point_light_G.position.set(0, 2, 1);

const point_light_B = new THREE.PointLight(0x0000FF, 20, 0);
point_light_B.position.set(2, 2, 1);

/*
DEBUGGING
Drawing the Axes
*/
const axesHelper = new THREE.AxesHelper(1);

// COMPILING COMPOSITION
scene.add(mesh_arc_C);
scene.add(camera); // Camera
scene.add(ambient_light); // Ambient Light
scene.add(point_light_W); // Point Light
scene.add(point_light_R);
scene.add(point_light_G);
scene.add(point_light_B);
scene.add(axesHelper); // Draw axes

/*
RENDER
Create canvas class for html to use, "threejs_composition" is name of the class.
*/
const canvas = document.querySelector("canvas.threejs_composition");
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);

//========================================================================

// TIME & ANIMATION
const clock = new THREE.Clock();

const update = () =>
{   
    /*
    Calculate elapsed time since
    start of program in seconds.
    */
    const elapsedTime = clock.getElapsedTime();

    mesh_arc_C.rotation.y = Math.PI * 0.5 + elapsedTime;

    // Render scene ...
    renderer.render(scene, camera);
    // ... and do recursion
    window.requestAnimationFrame(update);
};

//========================================================================

update();

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
})