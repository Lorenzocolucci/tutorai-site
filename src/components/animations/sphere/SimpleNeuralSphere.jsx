'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Componente sfera semplificato per test
const SimpleCore = () => {
  const groupRef = useRef();
  
  // Genera nodi semplici
  const nodes = useMemo(() => {
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < 100; i++) {
      // Distribuzione semplice sulla sfera
      const phi = Math.acos(-1 + (2 * i) / 100);
      const theta = Math.sqrt(100 * Math.PI) * phi;
      
      const x = Math.cos(theta) * Math.sin(phi) * 2;
      const y = Math.cos(phi) * 2;
      const z = Math.sin(theta) * Math.sin(phi) * 2;
      
      positions.push(x, y, z);
      colors.push(1, 1, 1); // Bianco per ora
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);
  
  // Animazione semplice
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Sfera esterna */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 16]} />
        <meshBasicMaterial 
          color={0x1e40af}
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </mesh>
      
      {/* Nodi interni */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={nodes.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={100}
            array={nodes.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={0x10b981}
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

// Componente principale semplificato
const SimpleNeuralSphere = ({ className = "", style = {} }) => {
  return (
    <div 
      className={`neural-sphere-simple ${className}`}
      style={{
        width: '100%',
        height: '400px',
        ...style
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <SimpleCore />
      </Canvas>
    </div>
  );
};

export default SimpleNeuralSphere;