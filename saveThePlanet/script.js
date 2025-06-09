import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

// Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 200, -400);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.enableRotate = false;
orbit.enablePan = false;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 200, -100);
scene.add(directionalLight);

// Earth
const earthGeometry = new THREE.SphereGeometry(100, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"),
  bumpMap: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_normal_2048.jpg"),
  bumpScale: 0.05,
  specularMap: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_specular_2048.jpg"),
  specular: new THREE.Color('grey')
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(0, -100, 0);
scene.add(earth);

// Clouds
const cloudGeometry = new THREE.SphereGeometry(101, 64, 64);
const cloudMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_clouds_1024.png"),
  transparent: true,
  opacity: 0.4
});

const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
earth.add(clouds);

// Stars Background
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starsPositions = [];
for (let i = 0; i < 5000; i++) {
  starsPositions.push(
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000)
  );
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPositions, 3));
scene.add(new THREE.Points(starsGeometry, starsMaterial));

// Game State
let level = 1;
let lives = 10;
let asteroids = [];
let asteroidSpeed = 0.005;
let spawnRate = 3000; // ms between spawns
let levelStartTime = Date.now();
const levelDurations = [20000, 25000, 30000, 35000, 40000]; // 20s, 25s, etc.

// UI
const levelDisplay = document.createElement('div');
levelDisplay.style.position = 'absolute';
levelDisplay.style.top = '10px';
levelDisplay.style.left = '10px';
levelDisplay.style.color = 'white';
levelDisplay.style.fontFamily = 'Arial';
levelDisplay.style.fontSize = '18px';
levelDisplay.textContent = `Level ${level}`;
document.body.appendChild(levelDisplay);

const livesDisplay = document.createElement('div');
livesDisplay.style.position = 'absolute';
livesDisplay.style.top = '10px';
livesDisplay.style.right = '10px';
livesDisplay.style.color = 'white';
livesDisplay.style.fontFamily = 'Arial';
livesDisplay.style.fontSize = '18px';
livesDisplay.textContent = `Lives: ${lives}`;
document.body.appendChild(livesDisplay);

const timerDisplay = document.createElement('div');
timerDisplay.style.position = 'absolute';
timerDisplay.style.bottom = '10px';
timerDisplay.style.left = '10px';
timerDisplay.style.color = 'white';
timerDisplay.style.fontFamily = 'Arial';
timerDisplay.style.fontSize = '18px';
document.body.appendChild(timerDisplay);

// Create Asteroids
function createAsteroid() {
  const size = THREE.MathUtils.randFloat(10, 20);
  const asteroid = new THREE.Mesh(
    new THREE.SphereGeometry(size, 12, 12),
    new THREE.MeshStandardMaterial({ 
      map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/moon_1024.jpg"),
      bumpMap: new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/moon_1024.jpg"),
      bumpScale: 0.05
    })
  );
  
  asteroid.position.set(
    THREE.MathUtils.randFloatSpread(800),
    THREE.MathUtils.randFloat(100, 300),
    0
  );
  
  asteroid.userData = {
    rotationSpeed: THREE.MathUtils.randFloat(0.01, 0.03)
  };
  
  scene.add(asteroid);
  asteroids.push({
    mesh: asteroid,
    speed: asteroidSpeed + Math.random() * 0.001
  });
}

// Asteroid Spawning System
let lastSpawnTime = 0;
function spawnAsteroids() {
  const currentTime = Date.now();
  const levelDuration = levelDurations[Math.min(level-1, levelDurations.length-1)];
  const timeLeft = levelDuration - (currentTime - levelStartTime);
  
  // Update timer display
  timerDisplay.textContent = `Time Left: ${Math.ceil(timeLeft/1000)}s`;
  
  // Check if level should end
  if (timeLeft <= 0) {
    levelUp();
    return;
  }
  
  // Spawn new asteroids based on level
  if (currentTime - lastSpawnTime > spawnRate) {
    const asteroidsToSpawn = Math.min(level, 5); // Cap at 5 asteroids per spawn
    for (let i = 0; i < asteroidsToSpawn; i++) {
      createAsteroid();
    }
    lastSpawnTime = currentTime;
  }
}

// Game Loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate earth and clouds
  earth.rotateY(-0.0005);
  clouds.rotateY(-0.0003);
  
  // Spawn asteroids
  spawnAsteroids();
  
  // Move and rotate asteroids
  asteroids.forEach((asteroid, index) => {
    if (asteroid.mesh) {
      asteroid.mesh.position.lerp(earth.position, asteroid.speed);
      asteroid.mesh.rotateY(asteroid.mesh.userData.rotationSpeed);
      
      // Check collision with earth
      if (asteroid.mesh.position.distanceTo(earth.position) < 110) {
        lives--;
        livesDisplay.textContent = `Lives: ${lives}`;
        scene.remove(asteroid.mesh);
        asteroids.splice(index, 1);
        
        if (lives <= 0) {
          gameOver();
        }
      }
    }
  });
  
  orbit.update();
  renderer.render(scene, camera);
}

function levelUp() {
  level++;
  asteroidSpeed += 0.001;
  spawnRate = Math.max(1000, 3000 - (level * 100)); // Slower reduction

  levelStartTime = Date.now();
  levelDisplay.textContent = `Level ${level}`;
  
  // Show level up notification
  const levelUpNotice = document.createElement('div');
  levelUpNotice.textContent = `LEVEL ${level}!`;
  levelUpNotice.style.position = 'absolute';
  levelUpNotice.style.top = '50%';
  levelUpNotice.style.left = '50%';
  levelUpNotice.style.transform = 'translate(-50%, -50%)';
  levelUpNotice.style.color = 'white';
  levelUpNotice.style.fontSize = '48px';
  levelUpNotice.style.fontFamily = 'Arial';
  levelUpNotice.style.textShadow = '0 0 10px #00ffff';
  document.body.appendChild(levelUpNotice);
  
  setTimeout(() => {
    document.body.removeChild(levelUpNotice);
  }, 2000);
}

function gameOver() {
  const gameOverDisplay = document.createElement('div');
  gameOverDisplay.textContent = `GAME OVER - Reached Level ${level}`;
  gameOverDisplay.style.position = 'absolute';
  gameOverDisplay.style.top = '50%';
  gameOverDisplay.style.left = '50%';
  gameOverDisplay.style.transform = 'translate(-50%, -50%)';
  gameOverDisplay.style.color = 'red';
  gameOverDisplay.style.fontSize = '36px';
  gameOverDisplay.style.fontFamily = 'Arial';
  gameOverDisplay.style.textShadow = '0 0 10px white';
  document.body.appendChild(gameOverDisplay);
  
  setTimeout(() => {
    document.body.removeChild(gameOverDisplay);
    // Reset game
    level = 1;
    lives = 10;
    asteroidSpeed = 0.005;
    spawnRate = 2000;
    
    // Remove all asteroids
    asteroids.forEach(a => {
      if (a.mesh) scene.remove(a.mesh);
    });
    asteroids = [];
    
    levelStartTime = Date.now();
    levelDisplay.textContent = `Level ${level}`;
    livesDisplay.textContent = `Lives: ${lives}`;
  }, 3000);
}

// Click to destroy asteroids
window.addEventListener('click', (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObjects(asteroids.map(a => a.mesh).filter(Boolean));
  
  if (intersects.length > 0) {
    const hitIndex = asteroids.findIndex(a => a.mesh === intersects[0].object);
    if (hitIndex !== -1) {
      const pos = intersects[0].point;
      scene.remove(asteroids[hitIndex].mesh);
      asteroids.splice(hitIndex, 1);
      
      // Add explosion effect
      const explosionGeometry = new THREE.BufferGeometry();
      const particles = 30;
      const positions = new Float32Array(particles * 3);
      
      for (let i = 0; i < particles; i++) {
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      }
      
      explosionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const explosionMaterial = new THREE.PointsMaterial({
        color: 0xff6600,
        size: 3,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending
      });
      
      const explosion = new THREE.Points(explosionGeometry, explosionMaterial);
      scene.add(explosion);
      
      // Animate explosion
      let frame = 0;
      const explodeInterval = setInterval(() => {
        frame++;
        const positions = explosionGeometry.attributes.position.array;
        
        for (let i = 0; i < particles; i++) {
          positions[i * 3] += (Math.random() - 0.5) * 2;
          positions[i * 3 + 1] += (Math.random() - 0.5) * 2;
          positions[i * 3 + 2] += (Math.random() - 0.5) * 2;
        }
        
        explosionGeometry.attributes.position.needsUpdate = true;
        explosionMaterial.opacity -= 0.03;
        
        if (frame > 30) {
          clearInterval(explodeInterval);
          scene.remove(explosion);
        }
      }, 30);
    }
  }
});

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the game
animate();