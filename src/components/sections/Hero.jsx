// src/components/sections/Hero.jsx

'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// Componente avanzato per la sfera neurale con effetti complessi
const NeuralSphere = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Rileva se è mobile per velocità di rotazione
    const isMobile = window.innerWidth < 1024;

    let time = 0;
    const nodes = [];
    const connections = [];
    
    // Genera nodi neurali fissi sulla superficie della sfera
    for (let i = 0; i < 120; i++) {
      const phi = Math.acos(1 - 2 * (i / 120));
      const theta = Math.sqrt(120 * Math.PI) * phi;
      
      nodes.push({
        phi,
        theta,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        energy: 0,
        baseSize: 0.8 + Math.random() * 1.2, // Dimensione base variabile (0.8x - 2x)
        importance: Math.random() > 0.85 ? 2 + Math.random() : 1 // Alcuni nodi sono "importanti"
      });
    }

    // Genera connessioni tra nodi vicini
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].phi - nodes[j].phi, 2) + 
          Math.pow(nodes[i].theta - nodes[j].theta, 2)
        );
        
        if (distance < 0.8 && Math.random() < 0.3) {
          connections.push({
            from: i,
            to: j,
            activity: 0,
            lastPulse: 0,
            thickness: 0.8 + Math.random() * 3.5, // Spessore variabile aumentato (0.8x - 4.3x)
            importance: (nodes[i].importance + nodes[j].importance) / 2 // Connessioni tra nodi importanti sono più spesse
          });
        }
        
        // Connessioni a lunga distanza (attraversano la sfera)
        if (Math.random() < 0.05) { // 5% di possibilità per connessioni lunghe
          const randomTarget = Math.floor(Math.random() * nodes.length);
          if (randomTarget !== i && randomTarget !== j) {
            connections.push({
              from: i,
              to: randomTarget,
              activity: 0,
              lastPulse: 0,
              thickness: 0.6 + Math.random() * 2.2, // Aumentate anche le connessioni lunghe
              importance: 0.8 + Math.random() * 0.4 // Importanza variabile
            });
          }
        }
      }
    }

    const animate = () => {
      // Velocità molto più alta per mobile
      time += isMobile ? 0.015 : 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.2;

      // Aggiorna energia dei nodi
      nodes.forEach((node, i) => {
        node.pulse += node.pulseSpeed;
        node.energy = Math.max(0, node.energy - 0.008);  // Fade più lento
        
        // Trigger casuale di attivazione neurale (molto meno frequente)
        if (Math.random() < 0.0008) {  // Da 0.003 a 0.0008 - molto più raro
          node.energy = 1;
          
          // Propaga energia ai nodi connessi
          connections.forEach(conn => {
            if (conn.from === i || conn.to === i) {
              conn.activity = 1;
              conn.lastPulse = time;
            }
          });
        }
      });

      // Disegna connessioni neurali attive
      connections.forEach(conn => {
        if (conn.activity > 0) {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          
          // Calcola posizioni 3D con rotazione sui 3 assi
          const fromRadius = baseRadius + Math.sin(fromNode.pulse) * 10;
          const toRadius = baseRadius + Math.sin(toNode.pulse) * 10;
          
          // Posizioni base sulla sfera
          let fromX = fromRadius * Math.sin(fromNode.phi) * Math.cos(fromNode.theta);
          let fromY = fromRadius * Math.sin(fromNode.phi) * Math.sin(fromNode.theta);
          let fromZ = fromRadius * Math.cos(fromNode.phi);
          
          let toX = toRadius * Math.sin(toNode.phi) * Math.cos(toNode.theta);
          let toY = toRadius * Math.sin(toNode.phi) * Math.sin(toNode.theta);
          let toZ = toRadius * Math.cos(toNode.phi);
          
          // Rotazione attorno all'asse Y (orizzontale) - velocità molto più alta per mobile
          const rotY = time * (isMobile ? 1.5 : 0.5);
          const fromXRotY = fromX * Math.cos(rotY) + fromZ * Math.sin(rotY);
          const fromZRotY = -fromX * Math.sin(rotY) + fromZ * Math.cos(rotY);
          const toXRotY = toX * Math.cos(rotY) + toZ * Math.sin(rotY);
          const toZRotY = -toX * Math.sin(rotY) + toZ * Math.cos(rotY);
          
          // Rotazione attorno all'asse X (verticale) - velocità molto più alta per mobile
          const rotX = time * (isMobile ? 1.2 : 0.35);
          const fromYRotX = fromY * Math.cos(rotX) - fromZRotY * Math.sin(rotX);
          const fromZRotX = fromY * Math.sin(rotX) + fromZRotY * Math.cos(rotX);
          const toYRotX = toY * Math.cos(rotX) - toZRotY * Math.sin(rotX);
          const toZRotX = toY * Math.sin(rotX) + toZRotY * Math.cos(rotX);
          
          // Rotazione attorno all'asse Z (profondità) - velocità molto più alta per mobile
          const rotZ = time * (isMobile ? 1.0 : 0.25);
          const fromX3d = fromXRotY * Math.cos(rotZ) - fromYRotX * Math.sin(rotZ);
          const fromY3d = fromXRotY * Math.sin(rotZ) + fromYRotX * Math.cos(rotZ);
          const fromZ3d = fromZRotX;
          
          const toX3d = toXRotY * Math.cos(rotZ) - toYRotX * Math.sin(rotZ);
          const toY3d = toXRotY * Math.sin(rotZ) + toYRotX * Math.cos(rotZ);
          const toZ3d = toZRotX;
          
          // Proiezione 3D -> 2D
          const perspective = 400;
          const fromScale = perspective / (perspective + fromZ3d);
          const toScale = perspective / (perspective + toZ3d);
          
          const fromX2D = centerX + fromX3d * fromScale;
          const fromY2D = centerY + fromY3d * fromScale;
          const toX2D = centerX + toX3d * toScale;
          const toY2D = centerY + toY3d * toScale;
          
          // Gradiente per la connessione (verde neon per attivazione neurale)
          const gradient = ctx.createLinearGradient(fromX2D, fromY2D, toX2D, toY2D);
          const alpha = conn.activity * 0.9;
          gradient.addColorStop(0, `rgba(34, 197, 94, ${alpha})`); // Verde brillante
          gradient.addColorStop(0.5, `rgba(16, 185, 129, ${alpha})`); // Verde acqua
          gradient.addColorStop(1, `rgba(34, 197, 94, ${alpha})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = conn.activity * conn.thickness * conn.importance; // Spessore variabile
          ctx.beginPath();
          
          // Crea curve organiche invece di linee dritte
          const midX = (fromX2D + toX2D) / 2;
          const midY = (fromY2D + toY2D) / 2;
          
          // Calcola offset per la curvatura (basato su rumore deterministico)
          const curveHash = (conn.from * 7919 + conn.to * 2503) % 1000; // Hash deterministico
          const curveStrength = 0.3 + (curveHash / 1000) * 0.4; // 0.3 - 0.7
          const curveAngle = (curveHash / 1000) * Math.PI * 2; // Direzione della curva
          
          const distance = Math.sqrt(Math.pow(toX2D - fromX2D, 2) + Math.pow(toY2D - fromY2D, 2));
          const curveOffset = distance * curveStrength * conn.activity; // Curvatura proporzionale all'attività
          
          const controlX = midX + Math.cos(curveAngle + time * 0.05) * curveOffset;
          const controlY = midY + Math.sin(curveAngle + time * 0.05) * curveOffset;
          
          // Disegna curva quadratica (più organica)
          ctx.moveTo(fromX2D, fromY2D);
          ctx.quadraticCurveTo(controlX, controlY, toX2D, toY2D);
          ctx.stroke();
          
          conn.activity *= 0.985; // Fade out molto più lento
        }
      });

      // Disegna nodi neurali con effetti 3D avanzati
      nodes.forEach((node, i) => {
        const radius = baseRadius + Math.sin(node.pulse) * 15 + node.energy * 20;
        
        // Posizione base del nodo
        let x = radius * Math.sin(node.phi) * Math.cos(node.theta);
        let y = radius * Math.sin(node.phi) * Math.sin(node.theta);
        let z = radius * Math.cos(node.phi);
        
        // Rotazione sui 3 assi - velocità molto più alta per mobile
        const rotY = time * (isMobile ? 1.5 : 0.5);
        const xRotY = x * Math.cos(rotY) + z * Math.sin(rotY);
        const zRotY = -x * Math.sin(rotY) + z * Math.cos(rotY);
        
        const rotX = time * (isMobile ? 1.2 : 0.35);
        const yRotX = y * Math.cos(rotX) - zRotY * Math.sin(rotX);
        const zRotX = y * Math.sin(rotX) + zRotY * Math.cos(rotX);
        
        const rotZ = time * (isMobile ? 1.0 : 0.25);
        const x3d = xRotY * Math.cos(rotZ) - yRotX * Math.sin(rotZ);
        const y3d = xRotY * Math.sin(rotZ) + yRotX * Math.cos(rotZ);
        const z3d = zRotX;
        
        const perspective = 400;
        const scale = perspective / (perspective + z3d);
        const x2d = centerX + x3d * scale;
        const y2d = centerY + y3d * scale;
        
        // Calcoli avanzati per effetti 3D
        const depth = (z3d + baseRadius) / (2 * baseRadius);
        const normalizedZ = z3d / baseRadius; // -1 a 1
        const isOnFrontHalf = z3d > 0;
        
        // Dimensione con effetto prospettiva più marcato
        const baseNodeSize = (2 + node.energy * 4) * scale * node.baseSize * node.importance;
        const nodeSize = baseNodeSize * (0.3 + depth * 0.7); // Nodi dietro più piccoli
        
        // Luminosità basata sulla posizione 3D (simula illuminazione)
        const lightAngle = Math.atan2(y3d, x3d) + Math.PI * 0.25; // Luce da sopra-sinistra
        const lightIntensity = Math.max(0.3, (Math.cos(lightAngle) + 1) * 0.5);
        const shadowIntensity = isOnFrontHalf ? 1 : 0.4; // Nodi dietro più scuri
        
        // Ombra dinamica del nodo (simula volume 3D)
        if (isOnFrontHalf && nodeSize > 1) {
          const shadowOffset = (1 - normalizedZ) * 3; // Ombra più lunga per nodi più vicini
          const shadowX = x2d + shadowOffset;
          const shadowY = y2d + shadowOffset;
          const shadowGradient = ctx.createRadialGradient(shadowX, shadowY, 0, shadowX, shadowY, nodeSize * 1.5);
          shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
          shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = shadowGradient;
          ctx.beginPath();
          ctx.arc(shadowX, shadowY, nodeSize * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Alone per il nodo attivo (verde per energia) con effetti 3D
        if (node.energy > 0.1) {
          const glowSize = nodeSize * (2 + node.energy * 3);
          const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, glowSize);
          const glowAlpha = node.energy * shadowIntensity;
          glowGradient.addColorStop(0, `rgba(34, 197, 94, ${glowAlpha * 0.4})`);
          glowGradient.addColorStop(0.4, `rgba(16, 185, 129, ${glowAlpha * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Nodo principale con illuminazione 3D
        const nodeGradient = ctx.createRadialGradient(
          x2d - nodeSize * 0.3, y2d - nodeSize * 0.3, 0, // Spostato verso luce
          x2d, y2d, nodeSize
        );
        const alpha = (depth * 0.6 + 0.4) * shadowIntensity * lightIntensity;
        const energyBoost = node.energy * 0.3;
        
        // Colori con variazione basata sulla profondità
        const frontColor = isOnFrontHalf ? 
          `rgba(255, 255, 255, ${(alpha + energyBoost) * 0.9})` : 
          `rgba(200, 200, 255, ${(alpha + energyBoost) * 0.6})`;
        const midColor = isOnFrontHalf ? 
          `rgba(147, 51, 234, ${alpha + energyBoost})` : 
          `rgba(100, 30, 160, ${(alpha + energyBoost) * 0.8})`;
        const edgeColor = isOnFrontHalf ? 
          `rgba(59, 130, 246, ${alpha * 0.7})` : 
          `rgba(40, 80, 150, ${alpha * 0.5})`;
          
        nodeGradient.addColorStop(0, frontColor);
        nodeGradient.addColorStop(0.4, midColor);
        nodeGradient.addColorStop(1, edgeColor);
        
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight per simulare riflessione della luce
        if (isOnFrontHalf && lightIntensity > 0.6) {
          const highlightSize = nodeSize * 0.4;
          const highlightGradient = ctx.createRadialGradient(
            x2d - nodeSize * 0.4, y2d - nodeSize * 0.4, 0,
            x2d - nodeSize * 0.4, y2d - nodeSize * 0.4, highlightSize
          );
          highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${lightIntensity * 0.6})`);
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = highlightGradient;
          ctx.beginPath();
          ctx.arc(x2d - nodeSize * 0.3, y2d - nodeSize * 0.3, highlightSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Particelle fluttuanti
      for (let i = 0; i < 20; i++) {
        const particleTime = time + i * 0.5;
        const particleRadius = baseRadius * 1.5;
        
        const phi = Math.sin(particleTime * 0.3) * Math.PI;
        const theta = particleTime * 0.8 + i;
        
        const x3d = particleRadius * Math.sin(phi) * Math.cos(theta);
        const y3d = particleRadius * Math.sin(phi) * Math.sin(theta);
        const z3d = particleRadius * Math.cos(phi);
        
        const perspective = 400;
        const scale = perspective / (perspective + z3d);
        const x2d = centerX + x3d * scale;
        const y2d = centerY + y3d * scale;
        
        const alpha = (Math.sin(particleTime) * 0.5 + 0.5) * 0.3;
        ctx.fillStyle = `rgba(147, 51, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, 1 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // EFFETTI ATMOSFERICI 3D - Fasce di energia che seguono la rotazione
      const atmosphereRadius = baseRadius * 1.2;
      
      // Crea fasce di luce che attraversano la sfera rotante
      for (let band = 0; band < 3; band++) {
        const bandAngle = (band * Math.PI * 0.6) + time * 0.3; // Rotazione lenta delle fasce
        const bandWidth = atmosphereRadius * 0.4;
        
        // Calcola le posizioni delle fasce in 3D
        for (let i = 0; i < 50; i++) {
          const angle = (i / 50) * Math.PI * 2;
          let x = atmosphereRadius * Math.cos(angle);
          let y = atmosphereRadius * Math.sin(angle) * Math.cos(bandAngle);
          let z = atmosphereRadius * Math.sin(angle) * Math.sin(bandAngle);
          
          // Applica la stessa rotazione della sfera - velocità molto più alta per mobile
          const rotY = time * (isMobile ? 1.5 : 0.5);
          const xRotY = x * Math.cos(rotY) + z * Math.sin(rotY);
          const zRotY = -x * Math.sin(rotY) + z * Math.cos(rotY);
          
          const rotX = time * (isMobile ? 1.2 : 0.35);
          const yRotX = y * Math.cos(rotX) - zRotY * Math.sin(rotX);
          const zRotX = y * Math.sin(rotX) + zRotY * Math.cos(rotX);
          
          const rotZ = time * (isMobile ? 1.0 : 0.25);
          const x3d = xRotY * Math.cos(rotZ) - yRotX * Math.sin(rotZ);
          const y3d = xRotY * Math.sin(rotZ) + yRotX * Math.cos(rotZ);
          const z3d = zRotX;
          
          // Proiezione 3D -> 2D
          const perspective = 400;
          const scale = perspective / (perspective + z3d);
          const x2d = centerX + x3d * scale;
          const y2d = centerY + y3d * scale;
          
          // Solo particelle visibili (davanti)
          if (z3d > -atmosphereRadius * 0.8) {
            const depth = (z3d + atmosphereRadius) / (2 * atmosphereRadius);
            const alpha = depth * 0.1 * (0.5 + Math.sin(angle * 3 + time) * 0.3);
            
            if (alpha > 0.02) {
              const particleGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, 8 * scale);
              particleGradient.addColorStop(0, `rgba(147, 51, 234, ${alpha})`);
              particleGradient.addColorStop(0.5, `rgba(34, 197, 94, ${alpha * 0.8})`);
              particleGradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
              
              ctx.fillStyle = particleGradient;
              ctx.beginPath();
              ctx.arc(x2d, y2d, 3 * scale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      
      
      // Riflessi dinamici sui nodi più luminosi (simula superficie cerebrale)
      nodes.forEach((node) => {
        if (node.energy > 0.3) {
          const radius = baseRadius + Math.sin(node.pulse) * 15 + node.energy * 20;
          
          let x = radius * Math.sin(node.phi) * Math.cos(node.theta);
          let y = radius * Math.sin(node.phi) * Math.sin(node.theta);
          let z = radius * Math.cos(node.phi);
          
          // Rotazione sui 3 assi - velocità molto più alta per mobile
          const rotY = time * (isMobile ? 1.5 : 0.5);
          const xRotY = x * Math.cos(rotY) + z * Math.sin(rotY);
          const zRotY = -x * Math.sin(rotY) + z * Math.cos(rotY);
          
          const rotX = time * (isMobile ? 1.2 : 0.35);
          const yRotX = y * Math.cos(rotX) - zRotY * Math.sin(rotX);
          const zRotX = y * Math.sin(rotX) + zRotY * Math.cos(rotX);
          
          const rotZ = time * (isMobile ? 1.0 : 0.25);
          const x3d = xRotY * Math.cos(rotZ) - yRotX * Math.sin(rotZ);
          const y3d = xRotY * Math.sin(rotZ) + yRotX * Math.cos(rotZ);
          const z3d = zRotX;
          
          // Solo per nodi nella parte anteriore
          if (z3d > 0) {
            const perspective = 400;
            const scale = perspective / (perspective + z3d);
            const x2d = centerX + x3d * scale;
            const y2d = centerY + y3d * scale;
            
            // Riflesso neurale (dimensione variabile)
            const reflectionSize = 15 * node.energy * node.baseSize * node.importance;
            const reflectionGradient = ctx.createRadialGradient(
              x2d - 3, y2d - 3, 0,
              x2d - 3, y2d - 3, reflectionSize
            );
            reflectionGradient.addColorStop(0, `rgba(255, 255, 255, ${node.energy * 0.6})`);
            reflectionGradient.addColorStop(0.5, `rgba(147, 51, 234, ${node.energy * 0.3})`);
            reflectionGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
            
            ctx.fillStyle = reflectionGradient;
            ctx.beginPath();
            ctx.arc(x2d - 3, y2d - 3, reflectionSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ touchAction: 'none' }}
    />
  );
};


// Componente per il testo animato che cambia
const AnimatedHeadline = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const textRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % phrases.length);
    }, 4000); // Cambia frase ogni 4 secondi
    return () => clearInterval(timer);
  }, [phrases.length]);

  // Calcola l'altezza massima di tutte le frasi
  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = textRefs.current
        .filter(ref => ref)
        .map(ref => ref.offsetHeight);
      
      if (heights.length > 0) {
        const max = Math.max(...heights);
        setMaxHeight(max);
      }
    };

    // Calcola dopo che tutti i ref sono stati assegnati
    const timer = setTimeout(calculateMaxHeight, 100);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
        minHeight: '4rem' // Fallback minimo
      }}
    >
      {phrases.map((phrase, i) => (
        <span
          key={i}
          ref={el => textRefs.current[i] = el}
          className={`absolute top-0 left-0 right-0 text-purple-300 transition-all duration-500 ${
            i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transform: i === index ? 'translateY(0)' : 'translateY(1rem)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            whiteSpace: 'normal', // Permette il wrap del testo
            wordBreak: 'break-word', // Gestisce parole lunghe
            lineHeight: '1.2', // Altezza di linea ottimizzata
            display: 'block' // Assicura che il testo si comporti come blocco
          }}
        >
          {phrase.includes('Tutor.AI') ? (
            <>
              <span className="text-purple-300">{phrase.split('Tutor.AI')[0]}</span>
              <span className="text-white">Tutor.AI</span>
            </>
          ) : (
            phrase
          )}
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation('pages');
  
  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const langPrefix = currentLang === 'en' ? '/en' : '';
  
  // Get translated phrases
  const rotatingPhrases = t('home.hero.rotatingPhrases', { 
    returnObjects: true,
    fallback: [
      "Un'IA che si adatta alla TUA mente.",
      "Apprendimento personale, per tutti.",
      "Cambia il tutor, non te stesso.",
      "Passa a Tutor.AI",
    ]
  });

  return (
    <section id="home" className="relative w-full lg:h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Background con sfera animata - Desktop: destra, Mobile: sotto il testo */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        {/* Desktop: sfera a destra */}
        <div className="hidden lg:block absolute left-1/4 top-0 w-3/4 h-full">
          <NeuralSphere />
        </div>
        {/* Mobile: sfera alzata del 35%, più visibile */}
        <div className="lg:hidden absolute top-1/3 left-0 right-0 h-1/2 opacity-70">
          <NeuralSphere />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/50" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Layout Desktop: Grid 2 colonne */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Colonna testo desktop - sinistra */}
          <div className="flex flex-col items-start text-left">
            <AnimateOnScroll className="flex flex-col items-start">
              <h1 className="text-4xl md:text-6xl font-bold !leading-tight">
                {t('home.hero.title', 'Non cambiare il tuo modo di imparare.')}
                <br />
                <AnimatedHeadline phrases={rotatingPhrases} />
              </h1>
              
              <p className="text-lg text-slate-300 max-w-xl mt-6">
                {t('home.hero.description', 'TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo. Dimentica le ore di studio inefficaci. Inizia un percorso di apprendimento personalizzato che funziona davvero per te.')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button href={`${langPrefix}/beta-access`} variant="secondary" className="text-lg flex items-center justify-center gap-2">
                  {t('home.hero.cta.primary', '🚀 Richiedi Accesso Beta')}
                </Button>
                <Button href="#features" variant="outline" className="text-lg !border-white !text-white hover:!bg-white hover:!text-primary">
                  {t('home.hero.cta.secondary', 'Scopri le funzionalità')}
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-400">{t('home.hero.betaNote', '✨ Accesso Beta a posti limitati.')}</p>
            </AnimateOnScroll>
          </div>
          
          {/* Colonna vuota per la sfera su desktop */}
          <div></div>
        </div>
        
        {/* Layout Mobile: Contenuto più vicino all'header */}
        <div className="lg:hidden flex flex-col min-h-screen pt-16 pb-4">
          {/* Sezione testo mobile - più in alto */}
          <div className="flex flex-col items-center text-center px-4 pt-8">
            <AnimateOnScroll className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-bold !leading-tight max-w-sm">
                {t('home.hero.title', 'Non cambiare il tuo modo di imparare.')}
                <br />
                <AnimatedHeadline phrases={rotatingPhrases} />
              </h1>
              
              <p className="text-base text-slate-300 max-w-md mt-4">
                {t('home.hero.description', 'TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo. Dimentica le ore di studio inefficaci. Inizia un percorso di apprendimento personalizzato che funziona davvero per te.')}
              </p>

              <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
                <Button href={`${langPrefix}/beta-access`} variant="secondary" className="text-base flex items-center justify-center gap-2">
                  {t('home.hero.cta.primary', '🚀 Richiedi Accesso Beta')}
                </Button>
                <Button href="#features" variant="outline" className="text-base !border-white !text-white hover:!bg-white hover:!text-primary">
                  {t('home.hero.cta.secondary', 'Scopri le funzionalità')}
                </Button>
              </div>
              <p className="mt-3 text-xs text-slate-400">{t('home.hero.betaNote', '✨ Accesso Beta a posti limitati.')}</p>
            </AnimateOnScroll>
          </div>
          
          {/* Sfera mobile - più visibile nella parte centrale-bassa */}
          <div className="flex-1 relative min-h-96"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
