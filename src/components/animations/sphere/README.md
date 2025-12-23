# Animated Neural Sphere Project

## Overview
Advanced 3D neural network sphere animation for TutorAI hero section.

## Technical Specifications
- **Primary Tool**: Blender 4.5.2 LTS + Geometry Nodes
- **Web Integration**: Three.js with React Three Fiber
- **Performance Target**: 60fps desktop, 30fps mobile
- **File Format**: GLB (optimized)

## Design Specs
- **Sphere**: Slightly flattened/elongated, glass material, blue color
- **Nodes**: 200-500 procedural nodes, organic distribution  
- **Connections**: Complex algorithm, varying importance (thickness/brightness)
- **Materials**: Acid green connections, blue transparent sphere
- **Animation**: Smooth rotation, pulsation, color effects

## Project Structure
```
sphere/
├── blender/
│   ├── neural-sphere.blend     # Main Blender project
│   └── exports/
│       └── neural-sphere.glb   # Exported animation
├── components/
│   ├── AnimatedSphere.jsx      # Main React component
│   ├── SphereGeometry.jsx      # 3D geometry definitions  
│   ├── SphereShaders.js        # Custom WebGL shaders
│   └── SphereControls.jsx      # Animation controls
└── assets/
    └── textures/               # Neural network textures
```

## Development Phases
1. ✅ Project setup and documentation
2. 🔄 Blender modeling and animation
3. ⏳ Three.js web integration
4. ⏳ Performance optimization
5. ⏳ Hero section integration

## Usage
Will replace the current CognitiveCore component with enhanced 3D neural sphere animation.