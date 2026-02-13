import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1f1a);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// Create multiple tropical plants (projects)
const plants = [];

for (let i = 0; i < 4; i++) {
  const geometry = new THREE.ConeGeometry(0.8, 2, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x2e8b57 + i * 2000,
  });

  const plant = new THREE.Mesh(geometry, material);
  plant.position.x = (i - 1.5) * 2.5;
  plant.userData = { name: `Project ${i + 1}` };

  scene.add(plant);
  plants.push(plant);
}

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a3d2f,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
scene.add(floor);

// Animation
function animate() {
  requestAnimationFrame(animate);

  plants.forEach(plant => {
    plant.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}
animate();

// Resize Fix
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
