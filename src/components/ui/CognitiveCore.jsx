// src/components/ui/CognitiveCore.jsx

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Componente per i "Neuroni" (le particelle in movimento)
const NeuralParticles = ({ count, connections }) => {
  const pointsRef = useRef();

  // Array per memorizzare la posizione attuale di ogni particella
  const particlePositions = useMemo(() => new Float32Array(count * 3), [count]);
  
  // Array per memorizzare i dati di animazione di ogni particella
  const particleData = useMemo(() => Array.from({ length: count }, () => ({
    pathIndex: Math.floor(Math.random() * connections.length), // Su quale connessione viaggia
    speed: Math.random() * 0.1 + 0.05, // Velocità casuale
    offset: Math.random() * 100, // Punto di partenza casuale sull'animazione
  })), [count, connections]);

  useFrame((state) => {
    const { clock } = state;

    particleData.forEach((data, i) => {
      const { pathIndex, speed, offset } = data;
      // Calcola il progresso lungo il percorso usando un'onda sinusoidale per un movimento fluido avanti e indietro
      const t = (Math.sin(clock.getElapsedTime() * speed + offset) + 1) / 2;
      
      // Ottiene la posizione corrente sul percorso (curva)
      const position = connections[pathIndex].getPoint(t);
      
      // Aggiorna le coordinate nell'array delle posizioni
      particlePositions[i * 3] = position.x;
      particlePositions[i * 3 + 1] = position.y;
      particlePositions[i * 3 + 2] = position.z;
    });

    // Notifica a Three.js che le posizioni sono state aggiornate
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={particlePositions}>
      <PointMaterial
        transparent
        color="#8B5CF6" // Viola Creatività
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

// Componente principale che assembla la scena
const CognitiveCore = () => {
  // Genera le "Interconnessioni" come curve casuali
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 50; i++) {
      const start = new THREE.Vector3(0, 0, 0);
      const mid = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      lines.push(new THREE.CatmullRomCurve3([start, mid, end]));
    }
    return lines;
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      
      {/* Il "Nucleo" centrale */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#5A67D8" emissiveIntensity={2} />
      </mesh>

      {/* Le "Interconnessioni" disegnate */}
      {connections.map((curve, index) => (
        <line key={index} geometry={new THREE.BufferGeometry().setFromPoints(curve.getPoints(50))}>
          <lineBasicMaterial color="#5A67D8" transparent opacity={0.2} />
        </line>
      ))}
      
      {/* I "Neuroni" che viaggiano sulle interconnessioni */}
      <NeuralParticles count={300} connections={connections} />
      
      {/* Controlli per l'utente: permette di ruotare e zoomare con il mouse */}
      <OrbitControls
        enableZoom={false} // CORREZIONE: Disabilitato lo zoom via scroll
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxDistance={10}
        minDistance={3}
      />
    </Canvas>
  );
};

export default CognitiveCore;
