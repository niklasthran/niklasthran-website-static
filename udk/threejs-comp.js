/*
threejs-comp.js
Niklas Thran
Fundamentals of 3D – Prati
M.A. VK
Berlin University of the Arts
*/

//========================================================================

// DEFINING SCENE & DIMENSIONS
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

scene.background = new THREE.Color(0x777777);

// DEFINING CAMERA
const frustum_size = 3;
let aspect = window.innerWidth / window.innerHeight;
camera = new THREE.OrthographicCamera(frustum_size * aspect / - 2, frustum_size * aspect / 2, frustum_size / 2, frustum_size / - 2, 0.1, 100);
camera.position.z = 2;

// OBJECT (Geometry Geom + Material Mat = Mesh)
const arc_geo = new THREE.TorusGeometry(1.2, 0.01, 128, 128, 10);

// Mesh MATERIAL
const material = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF});

// Mesh(Geom, Mat)
const arc_mesh = new THREE.Mesh(arc_geo, material);

// LIGHTS
const c_white = 0xFFFFFF;
const ambient_light = new THREE.AmbientLight(c_white, 0.1);

const point_light_W = new THREE.PointLight(c_white, 5, 0);
point_light_W.position.set(0, 2, 0.55);

const point_light_R = new THREE.PointLight(0xFF0000, 20, 0);
point_light_R.position.set(-2, 2, 1);

const point_light_G = new THREE.PointLight(0x00FF00, 20, 0);
point_light_G.position.set(0, 2, 1);

const point_light_B = new THREE.PointLight(0x0000FF, 20, 0);
point_light_B.position.set(2, 2, 1);

// DEBUGGING
const axesHelper = new THREE.AxesHelper(1);

// COMPILING COMP
scene.add(camera);
scene.add(ambient_light);
scene.add(point_light_W);
scene.add(point_light_R);
scene.add(point_light_G);
scene.add(point_light_B);
scene.add(arc_mesh);
scene.add(axesHelper);

// RENDERER
const canvas = document.querySelector("canvas.threejs-comp");
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);

//========================================================================

// TIME & ANIMATION
const clock = new THREE.Clock();

const update = () =>
{   
    const elapsedTime = clock.getElapsedTime();

    arc_mesh.rotation.y = Math.PI * 0.5 + elapsedTime;

    // Render and recursion
    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
};

//========================================================================

update();

// Resize camera and scene if browser window changes
window.addEventListener("resize", () => {
    let aspect = window.innerWidth / window.innerHeight;
    camera.left = frustum_size * aspect / - 2;
    camera.right = frustum_size * aspect / 2;
    camera.top = frustum_size / 2;
    camera.bottom = - frustum_size / 2;
    camera.updateProjectionMatrix();

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    renderer.setSize(sizes.width, sizes.height);
})