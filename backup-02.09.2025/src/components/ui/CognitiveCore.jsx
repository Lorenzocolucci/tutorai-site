// src/components/ui/CognitiveCore.jsx

'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Componente per i "Neuroni" (le particelle in movimento)
const NeuralParticles = ({ count, connections }) => {
  const pointsRef = useRef();
  const [particlePositions, setParticlePositions] = useState(() => new Float32Array(count * 3));
  
  // Array per memorizzare i dati di animazione di ogni particella
  const particleData = useMemo(() => {
    if (connections.length === 0) return [];
    return Array.from({ length: count }, () => ({
      pathIndex: Math.floor(Math.random() * connections.length), // Su quale connessione viaggia
      speed: Math.random() * 0.1 + 0.05, // Velocità casuale
      offset: Math.random() * 100, // Punto di partenza casuale sull'animazione
    }));
  }, [count, connections]);

  // Aggiorna l'array delle posizioni quando cambia il count
  useEffect(() => {
    setParticlePositions(new Float32Array(count * 3));
  }, [count]);

  useFrame((state) => {
    const { clock } = state;

    // Controlla se ci sono dati validi
    if (particleData.length === 0 || connections.length === 0) return;

    // Crea un nuovo array per le posizioni
    const newPositions = new Float32Array(count * 3);

    particleData.forEach((data, i) => {
      const { pathIndex, speed, offset } = data;
      // Calcola il progresso lungo il percorso usando un'onda sinusoidale per un movimento fluido avanti e indietro
      const t = (Math.sin(clock.getElapsedTime() * speed + offset) + 1) / 2;
      
      // Ottiene la posizione corrente sul percorso (curva)
      const position = connections[pathIndex].getPoint(t);
      
      // Aggiorna le coordinate nell'array delle posizioni
      newPositions[i * 3] = position.x;
      newPositions[i * 3 + 1] = position.y;
      newPositions[i * 3 + 2] = position.z;
    });

    // Aggiorna le posizioni solo se il buffer è valido
    if (pointsRef.current && pointsRef.current.geometry) {
      const positions = pointsRef.current.geometry.attributes.position;
      if (positions && positions.array && positions.array.length === newPositions.length) {
        positions.array.set(newPositions);
        positions.needsUpdate = true;
      }
    }
  });

  // Non renderizzare se non ci sono connessioni
  if (connections.length === 0) return null;

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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div 
      style={{ 
        width: '100%', 
        height: '100%',
        touchAction: 'none', // Disabilita completamente il touch
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      onTouchStart={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      onTouchEnd={(e) => e.preventDefault()}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ 
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
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
        <NeuralParticles count={isMobile ? 150 : 300} connections={connections} />
        
        {/* Controlli per l'utente: SOLO rotazione automatica, NO interazione touch */}
        <OrbitControls
          enableZoom={false} // Disabilitato lo zoom via scroll
          enablePan={false} // Disabilitato il pan
          enableRotate={false} // Disabilitata la rotazione manuale
          autoRotate={true} // Solo rotazione automatica
          autoRotateSpeed={0.5}
          maxDistance={10}
          minDistance={3}
          // Disabilita tutti gli eventi touch
          enableDamping={false}
          dampingFactor={0}
          rotateSpeed={0}
          panSpeed={0}
          zoomSpeed={0}
        />
      </Canvas>
    </div>
  );
};

export default CognitiveCore;
