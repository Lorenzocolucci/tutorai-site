/**
 * Custom WebGL shaders for optimized neural sphere rendering
 * Provides high-performance node and connection rendering with glow effects
 */

// Enhanced Node Vertex Shader
export const nodeVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  
  attribute float scale;
  attribute float intensity;
  attribute float nodeType;
  
  varying float vIntensity;
  varying float vNodeType;
  varying vec3 vColor;
  
  void main() {
    vIntensity = intensity;
    vNodeType = nodeType;
    vColor = color;
    
    // Dynamic scaling based on time and node type
    float timeScale = 1.0 + sin(uTime * 2.0 + position.x * 10.0) * 0.2;
    float typeMultiplier = nodeType == 1.0 ? 1.5 : (nodeType == 2.0 ? 0.7 : 1.0);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    gl_PointSize = scale * timeScale * typeMultiplier * uPixelRatio * 100.0 / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Enhanced Node Fragment Shader with Glow
export const nodeFragmentShader = `
  uniform float uTime;
  
  varying float vIntensity;
  varying float vNodeType;
  varying vec3 vColor;
  
  void main() {
    // Create circular point
    vec2 center = gl_PointCoord - 0.5;
    float distance = length(center);
    
    if (distance > 0.5) discard;
    
    // Smooth edge falloff
    float alpha = 1.0 - smoothstep(0.3, 0.5, distance);
    
    // Core brightness
    float core = 1.0 - smoothstep(0.0, 0.2, distance);
    
    // Pulsing effect
    float pulse = sin(uTime * 3.0 + vNodeType * 2.0) * 0.3 + 0.7;
    
    // Final color with glow
    vec3 finalColor = vColor * vIntensity * pulse;
    finalColor += vec3(1.0, 1.0, 1.0) * core * 0.5;
    
    gl_FragColor = vec4(finalColor, alpha * vIntensity);
  }
`;

// Connection Line Vertex Shader
export const connectionVertexShader = `
  uniform float uTime;
  
  attribute float importance;
  
  varying vec3 vColor;
  varying float vImportance;
  varying float vLifeline;
  
  void main() {
    vColor = color;
    vImportance = importance;
    
    // Calculate lifeline based on position along connection
    vLifeline = sin(uTime * 1.5 + position.x * 5.0 + position.y * 3.0) * 0.5 + 0.5;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Connection Line Fragment Shader with Flow Effect
export const connectionFragmentShader = `
  uniform float uTime;
  
  varying vec3 vColor;
  varying float vImportance;
  varying float vLifeline;
  
  void main() {
    // Base acid green color
    vec3 baseColor = vec3(0.2, 1.0, 0.3);
    
    // Modulate with importance and flow
    float flow = sin(uTime * 4.0 + vLifeline * 10.0) * 0.5 + 0.5;
    float intensity = vImportance * (0.7 + flow * 0.3);
    
    vec3 finalColor = baseColor * intensity;
    float alpha = intensity * 0.8;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Glass Sphere Vertex Shader
export const sphereVertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Glass Sphere Fragment Shader with Fresnel
export const sphereFragmentShader = `
  uniform float uTime;
  uniform vec3 uCameraPosition;
  
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
    
    // Fresnel effect
    float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);
    
    // Base blue color
    vec3 baseColor = vec3(0.1, 0.3, 0.8);
    
    // Add subtle animation
    float animation = sin(uTime * 0.5 + vUv.x * 10.0 + vUv.y * 8.0) * 0.1 + 0.9;
    
    // Combine effects
    vec3 finalColor = baseColor * animation;
    float alpha = (fresnel * 0.6 + 0.1) * 0.4;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Shader material factory functions
export const createNodeMaterial = () => ({
  vertexShader: nodeVertexShader,
  fragmentShader: nodeFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  vertexColors: true
});

export const createConnectionMaterial = () => ({
  vertexShader: connectionVertexShader,
  fragmentShader: connectionFragmentShader,
  uniforms: {
    uTime: { value: 0 }
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  vertexColors: true
});

export const createSphereMaterial = (camera) => ({
  vertexShader: sphereVertexShader,
  fragmentShader: sphereFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uCameraPosition: { value: camera.position }
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false
});

// Performance optimization presets
export const shaderPresets = {
  high: {
    nodeComplexity: 'full',
    connectionFlow: true,
    sphereEffects: true,
    particleCount: 500
  },
  medium: {
    nodeComplexity: 'simplified',
    connectionFlow: true,
    sphereEffects: false,
    particleCount: 300
  },
  low: {
    nodeComplexity: 'basic',
    connectionFlow: false,
    sphereEffects: false,
    particleCount: 150
  }
};

export default {
  nodeVertexShader,
  nodeFragmentShader,
  connectionVertexShader,
  connectionFragmentShader,
  sphereVertexShader,
  sphereFragmentShader,
  createNodeMaterial,
  createConnectionMaterial,
  createSphereMaterial,
  shaderPresets
};