
# Vision Therapy 3D Asteroid Game

A browser-based 3D game built with Three.js to support visual rehabilitation therapy for patients with amblyopia and strabismus. The game engages players through interactive asteroid destruction, tracking visual performance and adapting difficulty in real time.

## Features

- Realistic 3D Earth Environment using Three.js and WebGL
- Rotating Asteroids that move toward Earth
- Click-based asteroid destruction with particle explosion effects
- Adaptive Difficulty based on level and time
- Level Progression System with increasing challenge
- UI elements for lives, timer, and level tracking
- Responsive Design for cross-device compatibility
- Therapy-driven gameplay to assist with vision treatment

## Tech Stack

- Frontend: JavaScript (ES6+), Three.js, WebGL
- Rendering: SphereGeometry, MeshStandardMaterial, OrbitControls
- Game Logic: Raycasting, animations, collisions, state management
- UI: HTML DOM elements for dynamic game interface

## How to Run Locally

### 1. Clone the Repository

```
git clone https://github.com/lakshhayy/projects-.git
cd projects-
```

### 2. Start a Local Server

Use any local server to run the game (VS Code Live Server, Python, Node, etc.)

With Python 3:
```
python -m http.server
```

With Node.js:
```
npx serve .
```

### 3. Open in Browser
Go to:  
http://localhost:8000  
(or the port shown in your terminal)

## Gameplay Mechanics

- Click asteroids before they hit Earth
- Lives reduce with each missed asteroid
- Levels increase every 20–40 seconds (depending on progression)
- Explosions are triggered on successful hit
- Difficulty increases: faster asteroids + more spawn rate

## Medical Purpose

This game is designed to support binocular vision therapy, especially for:
- Amblyopia (lazy eye)
- Strabismus (crossed eyes)

It encourages:
- Visual focus
- Reaction time
- Coordination

## Project Structure

```
.
├── index.html
├── script.js
├── textures/
└── node_modules/
```

## To Do

- Add backend API integration for saving patient data
- Add game summary screen with accuracy stats
- Add sound effects for hits/misses
- Add visual themes for different therapy phases

## License

This project is open-source and available under the MIT License.

## Created By

Lakshay Kaushik  
Frontend Developer | HealthTech & Vision Therapy Focused  
GitHub: https://github.com/lakshhayy  
LinkedIn: https://linkedin.com/in/lakshhayy
