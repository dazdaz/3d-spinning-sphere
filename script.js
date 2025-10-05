// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create starfield
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    transparent: true,
    opacity: 0.8
});

const starsVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Sphere geometry and material with lighter blue color
const geometry = new THREE.SphereGeometry(1.5, 32, 32); // Increased size from 1 to 1.5
const material = new THREE.MeshStandardMaterial({
    color: 0x87ceeb, // Lighter blue color (sky blue)
    emissive: 0x4488cc,
    emissiveIntensity: 0.5,
    roughness: 0.1,
    metalness: 0.8,
    wireframe: false
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add wireframe overlay for better rotation visibility
const wireframeGeometry = new THREE.SphereGeometry(1.51, 16, 12); // Slightly larger than sphere
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
sphere.add(wireframeSphere);

// Add small lights at wireframe intersections
const intersectionLights = [];
const lightGeometry = new THREE.SphereGeometry(0.02, 8, 8);
const lightMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    emissive: 0xffffff
});

// Create lights at key intersection points
const intersectionPoints = [
    { theta: 0, phi: 0 },
    { theta: Math.PI/2, phi: 0 },
    { theta: Math.PI, phi: 0 },
    { theta: 3*Math.PI/2, phi: 0 },
    { theta: 0, phi: Math.PI/2 },
    { theta: Math.PI/2, phi: Math.PI/2 },
    { theta: Math.PI, phi: Math.PI/2 },
    { theta: 3*Math.PI/2, phi: Math.PI/2 },
    { theta: 0, phi: Math.PI },
    { theta: Math.PI/2, phi: Math.PI },
    { theta: Math.PI, phi: Math.PI },
    { theta: 3*Math.PI/2, phi: Math.PI },
    { theta: Math.PI/4, phi: Math.PI/4 },
    { theta: 3*Math.PI/4, phi: Math.PI/4 },
    { theta: 5*Math.PI/4, phi: Math.PI/4 },
    { theta: 7*Math.PI/4, phi: Math.PI/4 },
    { theta: Math.PI/4, phi: 3*Math.PI/4 },
    { theta: 3*Math.PI/4, phi: 3*Math.PI/4 },
    { theta: 5*Math.PI/4, phi: 3*Math.PI/4 },
    { theta: 7*Math.PI/4, phi: 3*Math.PI/4 }
];

intersectionPoints.forEach(point => {
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.x = 1.52 * Math.sin(point.phi) * Math.cos(point.theta);
    light.position.y = 1.52 * Math.cos(point.phi);
    light.position.z = 1.52 * Math.sin(point.phi) * Math.sin(point.theta);
    
    intersectionLights.push(light);
    sphere.add(light);
});

// Add some visual markers (small spheres) on the surface
const markerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Place markers at different positions on the sphere
for (let i = 0; i < 8; i++) {
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    const theta = (i / 8) * Math.PI * 2;
    const phi = Math.PI / 4;
    
    marker.position.x = 1.5 * Math.sin(phi) * Math.cos(theta);
    marker.position.y = 1.5 * Math.cos(phi);
    marker.position.z = 1.5 * Math.sin(phi) * Math.sin(theta);
    
    sphere.add(marker);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Camera position
camera.position.z = 5;

// Mouse interaction variables
let mouseX = 0;
let mouseY = 0;
let spherePositionX = 0;
let spherePositionY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Mouse move event
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
});

// Toggle starfield functionality
const toggleButton = document.getElementById('toggleStarfield');
let starfieldEnabled = true;

toggleButton.addEventListener('click', () => {
    starfieldEnabled = !starfieldEnabled;
    starField.visible = starfieldEnabled;
    toggleButton.textContent = starfieldEnabled ? 'Disable Starfield' : 'Enable Starfield';
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Slowly move the ball around the screen
    spherePositionX += mouseX * 0.02;
    spherePositionY += mouseY * 0.02;
    
    // Apply damping to slow down movement
    spherePositionX *= 0.95;
    spherePositionY *= 0.95;
    
    // Update sphere position
    sphere.position.x = spherePositionX;
    sphere.position.y = spherePositionY;
    
    // Keep sphere within bounds
    const maxDistance = 3;
    sphere.position.x = Math.max(-maxDistance, Math.min(maxDistance, sphere.position.x));
    sphere.position.y = Math.max(-maxDistance, Math.min(maxDistance, sphere.position.y));

    // Auto-spin the ball continuously (slower rotation)
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    
    // Add mouse influence to rotation
    sphere.rotation.x += mouseY * 0.02;
    sphere.rotation.y += mouseX * 0.02;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});