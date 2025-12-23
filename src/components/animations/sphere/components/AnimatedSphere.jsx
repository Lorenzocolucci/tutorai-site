'use client';

import { useRef, useMemo, useFrame, useContext, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  generateFibonacciSphere, 
  generateComplexConnections, 
  generateNodeProperties,
  calculateConnectionColors 
} from './SphereGeometry';
import { 
  nodeVertexShader, 
  nodeFragmentShader,
  connectionVertexShader,
  connectionFragmentShader,
  sphereVertexShader,
  sphereFragmentShader 
} from './SphereShaders';
import { 
  PerformanceContext, 
  useInteractionController 
} from './SphereControls';

// Core neural sphere component
const NeuralSphereCore = ({ radius = 2 }) => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const nodesRef = useRef();
  const connectionsRef = useRef();
  
  const { config, monitorPerformance } = useContext(PerformanceContext);
  const { nodeCount, connectionMultiplier, animationQuality } = config;
  
  const {
    isHovered,
    isClicked,
    mousePosition,
    handleMouseMove,
    handleHover,
    handleClick
  } = useInteractionController(groupRef);

  // Generate procedural geometry using advanced algorithms
  const sphereGeometry = useMemo(() => {
    const { positions, normals } = generateFibonacciSphere(
      nodeCount, 
      radius, 
      0.85, // flatten
      1.15  // elongate
    );
    
    const nodeProps = generateNodeProperties(nodeCount, {
      baseScale: 0.8,
      scaleVariation: 0.4,
      baseIntensity: 1.0,
      intensityVariation: 0.3
    });
    
    // Convert to Vector3 for connection algorithm
    const nodePositions3D = [];
    for (let i = 0; i < nodeCount; i++) {
      nodePositions3D.push(new THREE.Vector3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      ));
    }
    
    const connections = generateComplexConnections(nodePositions3D, {
      baseConnections: Math.floor(3 * connectionMultiplier),
      maxConnections: Math.floor(6 * connectionMultiplier),
      hubThreshold: 0.8,
      peripheralThreshold: 0.3
    });
    
    return {
      nodePositions: new Float32Array(positions),
      nodeNormals: new Float32Array(normals),
      nodeScales: new Float32Array(nodeProps.scales),
      nodeIntensities: new Float32Array(nodeProps.intensities),
      nodeTypes: new Float32Array(nodeProps.types),
      connections,
      nodePositions3D
    };
  }, [nodeCount, radius, connectionMultiplier]);

  // Convert connections to buffer geometry
  const connectionGeometry = useMemo(() => {
    const positions = [];
    const colors = [];
    const importances = [];
    
    sphereGeometry.connections.forEach(connection => {
      positions.push(
        connection.start.x, connection.start.y, connection.start.z,
        connection.end.x, connection.end.y, connection.end.z
      );
      
      // Acid green base color
      const intensity = connection.importance;
      colors.push(
        0.2 * intensity, 1.0 * intensity, 0.3 * intensity,
        0.2 * intensity, 1.0 * intensity, 0.3 * intensity
      );
      
      importances.push(connection.importance, connection.importance);
    });
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      importances: new Float32Array(importances)
    };
  }, [sphereGeometry.connections]);

  // Shader materials
  const nodeMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: nodeVertexShader,
    fragmentShader: nodeFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMousePosition: { value: new THREE.Vector2() },
      uHovered: { value: 0 },
      uClicked: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true
  }), []);

  const connectionMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: connectionVertexShader,
    fragmentShader: connectionFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uFlowSpeed: { value: animationQuality === 'full' ? 1.0 : 0.5 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    linewidth: 2
  }), [animationQuality]);

  const sphereMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: sphereVertexShader,
    fragmentShader: sphereFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() }
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  }), []);

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Performance monitoring
    monitorPerformance();
    
    // Update shader uniforms
    if (nodeMaterial.uniforms) {
      nodeMaterial.uniforms.uTime.value = time;
      nodeMaterial.uniforms.uMousePosition.value.set(mousePosition.x, mousePosition.y);
      nodeMaterial.uniforms.uHovered.value = isHovered ? 1 : 0;
      nodeMaterial.uniforms.uClicked.value = isClicked ? 1 : 0;
    }
    
    if (connectionMaterial.uniforms) {
      connectionMaterial.uniforms.uTime.value = time;
    }
    
    if (sphereMaterial.uniforms) {
      sphereMaterial.uniforms.uTime.value = time;
      sphereMaterial.uniforms.uCameraPosition.value.copy(state.camera.position);
    }
    
    // Rotation animation
    if (groupRef.current) {
      const rotationSpeed = isHovered ? 1.5 : 1.0;
      groupRef.current.rotation.y += delta * 0.15 * rotationSpeed;
      groupRef.current.rotation.x += delta * 0.05 * rotationSpeed;
      
      // Subtle bobbing motion
      if (animationQuality === 'full') {
        groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      }
    }
    
    // Scale animation on interaction
    if (groupRef.current) {
      const targetScale = isHovered ? 1.05 : (isClicked ? 1.1 : 1.0);
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={() => handleHover(true)}
      onPointerLeave={() => handleHover(false)}
      onClick={handleClick}
    >
      {/* Outer glass sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[radius, 64, 32]} />
        <primitive object={sphereMaterial} attach="material" />
      </mesh>
      
      {/* Internal nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={sphereGeometry.nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={nodeCount}
            array={sphereGeometry.nodeScales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-intensity"
            count={nodeCount}
            array={sphereGeometry.nodeIntensities}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-nodeType"
            count={nodeCount}
            array={sphereGeometry.nodeTypes}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={nodeMaterial} attach="material" />
      </points>
      
      {/* Neural connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionGeometry.positions.length / 3}
            array={connectionGeometry.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={connectionGeometry.colors.length / 3}
            array={connectionGeometry.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-importance"
            count={connectionGeometry.importances.length}
            array={connectionGeometry.importances}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={connectionMaterial} attach="material" />
      </lineSegments>
    </group>
  );
};

// Main animated sphere component with performance wrapper
const AnimatedSphere = ({ 
  radius = 2,
  className = "",
  style = {},
  performanceLevel = "auto" 
}) => {
  return (
    <div className={`neural-sphere-container ${className}`} style={style}>
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 50,
          near: 0.1,
          far: 1000 
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <NeuralSphereCore radius={radius} />
      </Canvas>
    </div>
  );
};

export default AnimatedSphere;