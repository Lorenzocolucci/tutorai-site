'use client';

import { useRef, useEffect, useState, useCallback, createContext } from 'react';

/**
 * Performance and animation control system for neural sphere
 * Handles device detection, performance adaptation, and animation management
 */

// Device performance detection
export const detectPerformanceLevel = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'low';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // GPU performance heuristics
  const isHighEnd = /nvidia|amd|intel iris|apple/i.test(renderer);
  const isMobile = /mobile|android|ios/i.test(navigator.userAgent);
  const hasGoodRAM = navigator.deviceMemory ? navigator.deviceMemory >= 4 : true;
  
  if (isHighEnd && !isMobile && hasGoodRAM) return 'high';
  if (!isMobile && hasGoodRAM) return 'medium';
  return 'low';
};

// Battery status hook for mobile optimization
export const useBatteryOptimization = () => {
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isCharging, setIsCharging] = useState(true);
  
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level);
        setIsCharging(battery.charging);
        
        battery.addEventListener('levelchange', () => setBatteryLevel(battery.level));
        battery.addEventListener('chargingchange', () => setIsCharging(battery.charging));
      });
    }
  }, []);
  
  // Reduce performance when battery is low and not charging
  const shouldReducePerformance = batteryLevel < 0.2 && !isCharging;
  
  return { batteryLevel, isCharging, shouldReducePerformance };
};

// Animation controller component
export const SphereAnimationController = ({ 
  children, 
  autoPerformance = true,
  forcedPerformanceLevel = null 
}) => {
  const performanceLevel = forcedPerformanceLevel || detectPerformanceLevel();
  const { shouldReducePerformance } = useBatteryOptimization();
  const frameCount = useRef(0);
  const lastFrameTime = useRef(Date.now());
  const averageFPS = useRef(60);
  
  // FPS monitoring
  const monitorPerformance = useCallback(() => {
    const now = Date.now();
    const delta = now - lastFrameTime.current;
    
    if (delta > 0) {
      const fps = 1000 / delta;
      averageFPS.current = averageFPS.current * 0.9 + fps * 0.1;
      frameCount.current++;
      
      // Adjust performance if FPS drops below threshold
      if (frameCount.current % 60 === 0) { // Check every 60 frames
        if (averageFPS.current < 30 && autoPerformance) {
          console.log('Neural Sphere: Reducing performance due to low FPS');
        }
      }
    }
    
    lastFrameTime.current = now;
  }, [autoPerformance]);
  
  // Performance configuration
  const getPerformanceConfig = () => {
    let level = performanceLevel;
    
    if (shouldReducePerformance) level = 'low';
    if (averageFPS.current < 30) level = level === 'high' ? 'medium' : 'low';
    
    return {
      high: {
        nodeCount: 500,
        connectionMultiplier: 1.0,
        animationQuality: 'full',
        shaderComplexity: 'high',
        particleEffects: true,
        bloomIntensity: 1.0
      },
      medium: {
        nodeCount: 300,
        connectionMultiplier: 0.8,
        animationQuality: 'reduced',
        shaderComplexity: 'medium',
        particleEffects: true,
        bloomIntensity: 0.7
      },
      low: {
        nodeCount: 150,
        connectionMultiplier: 0.6,
        animationQuality: 'minimal',
        shaderComplexity: 'low',
        particleEffects: false,
        bloomIntensity: 0.4
      }
    }[level];
  };
  
  return (
    <PerformanceContext.Provider value={{ 
      config: getPerformanceConfig(), 
      monitorPerformance,
      currentLevel: performanceLevel,
      averageFPS: averageFPS.current
    }}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Animation presets
export const animationPresets = {
  subtle: {
    rotationSpeed: { x: 0.01, y: 0.02, z: 0.005 },
    pulsationIntensity: 0.1,
    colorVariation: 0.05,
    nodeMovement: false
  },
  moderate: {
    rotationSpeed: { x: 0.02, y: 0.05, z: 0.01 },
    pulsationIntensity: 0.2,
    colorVariation: 0.15,
    nodeMovement: true,
    movementAmplitude: 0.1
  },
  dynamic: {
    rotationSpeed: { x: 0.03, y: 0.08, z: 0.02 },
    pulsationIntensity: 0.4,
    colorVariation: 0.3,
    nodeMovement: true,
    movementAmplitude: 0.2,
    connectionFlow: true
  }
};

// Interaction controller
export const useInteractionController = (sphereRef) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((event) => {
    const rect = event.target.getBoundingClientRect();
    mousePosition.current = {
      x: (event.clientX - rect.left) / rect.width * 2 - 1,
      y: -(event.clientY - rect.top) / rect.height * 2 + 1
    };
  }, []);
  
  const handleHover = useCallback((hovered) => {
    setIsHovered(hovered);
    if (sphereRef.current) {
      // Add subtle interaction feedback
      sphereRef.current.scale.setScalar(hovered ? 1.05 : 1.0);
    }
  }, [sphereRef]);
  
  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    if (sphereRef.current) {
      // Click animation - brief intensity boost
      sphereRef.current.material.uniforms.uIntensity.value = 2.0;
      setTimeout(() => {
        sphereRef.current.material.uniforms.uIntensity.value = 1.0;
      }, 300);
    }
  }, [sphereRef]);
  
  return {
    isHovered,
    isClicked,
    mousePosition: mousePosition.current,
    handleMouseMove,
    handleHover,
    handleClick
  };
};

// Performance context for component communication
export const PerformanceContext = createContext({});

export default {
  detectPerformanceLevel,
  useBatteryOptimization,
  SphereAnimationController,
  animationPresets,
  useInteractionController,
  PerformanceContext
};