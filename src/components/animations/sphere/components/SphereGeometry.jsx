'use client';

import * as THREE from 'three';

/**
 * Advanced geometry utilities for procedural neural sphere
 */

// Fibonacci Sphere Algorithm - Perfect organic distribution
export const generateFibonacciSphere = (count, radius = 1, flatten = 0.85, elongate = 1.15) => {
  const positions = [];
  const normals = [];
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    
    // Golden angle increment for perfect distribution
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    // Apply shape modifications
    const finalX = x * radius * 0.95;
    const finalY = y * radius * flatten;
    const finalZ = z * radius * elongate;
    
    positions.push(finalX, finalY, finalZ);
    
    // Calculate normals for lighting
    const length = Math.sqrt(finalX * finalX + finalY * finalY + finalZ * finalZ);
    normals.push(finalX / length, finalY / length, finalZ / length);
  }
  
  return { positions, normals };
};

// Complex Connection Algorithm - Network topology inspired
export const generateComplexConnections = (nodePositions3D, params = {}) => {
  const {
    baseConnections = 3,
    maxConnections = 6,
    hubThreshold = 0.8,
    peripheralThreshold = 0.3,
    distanceWeight = 1.0,
    angleWeight = 0.3
  } = params;
  
  const connections = [];
  const nodeCount = nodePositions3D.length;
  
  for (let i = 0; i < nodeCount; i++) {
    const currentNode = nodePositions3D[i];
    const candidates = [];
    
    // Calculate all potential connections with scoring
    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue;
      
      const targetNode = nodePositions3D[j];
      const distance = currentNode.distanceTo(targetNode);
      
      // Calculate angle from center (for hub detection)
      const centerToI = currentNode.clone().normalize();
      const centerToJ = targetNode.clone().normalize();
      const angle = centerToI.angleTo(centerToJ);
      
      // Composite score: closer nodes and good angles are preferred
      const score = (1 / distance) * distanceWeight + (1 / (angle + 0.1)) * angleWeight;
      
      candidates.push({
        index: j,
        position: targetNode,
        distance,
        angle,
        score
      });
    }
    
    // Sort by composite score
    candidates.sort((a, b) => b.score - a.score);
    
    // Determine connection count based on node importance
    const importance = Math.random();
    let connectionCount = baseConnections;
    
    if (importance > hubThreshold) {
      // Hub nodes - highly connected
      connectionCount = Math.min(maxConnections, Math.floor(baseConnections * 1.5));
    } else if (importance < peripheralThreshold) {
      // Peripheral nodes - fewer connections
      connectionCount = Math.max(1, Math.floor(baseConnections * 0.7));
    }
    
    // Create connections with importance weighting
    for (let k = 0; k < Math.min(connectionCount, candidates.length); k++) {
      const target = candidates[k];
      const connectionImportance = importance > hubThreshold ? 1.5 : 
                                 importance < peripheralThreshold ? 0.6 : 1.0;
      
      connections.push({
        start: currentNode,
        end: target.position,
        importance: connectionImportance,
        distance: target.distance,
        nodeIndex: i,
        targetIndex: target.index
      });
    }
  }
  
  return connections;
};

// Advanced material properties generator
export const generateNodeProperties = (count, params = {}) => {
  const {
    baseScale = 1.0,
    scaleVariation = 0.4,
    baseIntensity = 1.0,
    intensityVariation = 0.3
  } = params;
  
  const scales = [];
  const intensities = [];
  const types = [];
  
  for (let i = 0; i < count; i++) {
    // Node scale with variation
    scales.push(baseScale + (Math.random() - 0.5) * scaleVariation);
    
    // Node intensity for glow effect
    intensities.push(baseIntensity + (Math.random() - 0.5) * intensityVariation);
    
    // Node type (0: normal, 1: hub, 2: peripheral)
    const rand = Math.random();
    if (rand > 0.85) types.push(1); // Hub (15% chance)
    else if (rand < 0.25) types.push(2); // Peripheral (25% chance)  
    else types.push(0); // Normal (60% chance)
  }
  
  return { scales, intensities, types };
};

// Dynamic color calculation for connections
export const calculateConnectionColors = (connections, time = 0) => {
  const colors = [];
  
  connections.forEach((connection, index) => {
    const { importance, distance } = connection;
    
    // Base acid green
    const baseR = 0.2;
    const baseG = 1.0;  
    const baseB = 0.3;
    
    // Modulate based on importance and time
    const timeFactor = Math.sin(time * 0.5 + index * 0.1) * 0.3 + 0.7;
    const distanceFactor = Math.max(0.4, 1 - distance * 0.1);
    
    const finalIntensity = importance * timeFactor * distanceFactor;
    
    // Apply intensity to color
    colors.push(
      baseR * finalIntensity,
      baseG * finalIntensity, 
      baseB * finalIntensity
    );
    colors.push(
      baseR * finalIntensity,
      baseG * finalIntensity,
      baseB * finalIntensity
    );
  });
  
  return new Float32Array(colors);
};

// Performance optimization utilities
export const createLODGeometry = (baseNodeCount, performanceLevel) => {
  const lodCounts = {
    high: baseNodeCount,
    medium: Math.floor(baseNodeCount * 0.7),
    low: Math.floor(baseNodeCount * 0.4)
  };
  
  return lodCounts[performanceLevel] || lodCounts.medium;
};

export default {
  generateFibonacciSphere,
  generateComplexConnections,
  generateNodeProperties,
  calculateConnectionColors,
  createLODGeometry
};