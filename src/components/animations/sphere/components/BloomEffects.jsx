'use client';

import { useRef, useMemo } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import * as THREE from 'three';

// Extend R3F with post-processing classes
extend({ EffectComposer, RenderPass, UnrealBloomPass, OutputPass, SMAAPass });

/**
 * Advanced Bloom Post-Processing Component
 * Creates intense glow effects for neural sphere elements
 */
const BloomEffects = ({ 
  bloomStrength = 1.5,
  bloomRadius = 0.8,
  bloomThreshold = 0.1,
  enableAntialiasing = true,
  adaptiveBloom = true 
}) => {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef();
  
  // Create post-processing composer
  const composer = useMemo(() => {
    const effectComposer = new EffectComposer(gl);
    
    // Main render pass
    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);
    
    // Unreal Bloom Pass for intense glow effects
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    
    // Optimize bloom settings for neural sphere
    bloomPass.strength = bloomStrength;
    bloomPass.radius = bloomRadius;
    bloomPass.threshold = bloomThreshold;
    
    effectComposer.addPass(bloomPass);
    
    // Anti-aliasing pass for clean edges
    if (enableAntialiasing) {
      const smaaPass = new SMAAPass();
      effectComposer.addPass(smaaPass);
    }
    
    // Output pass for final render
    const outputPass = new OutputPass();
    effectComposer.addPass(outputPass);
    
    return effectComposer;
  }, [gl, scene, camera, size, bloomStrength, bloomRadius, bloomThreshold, enableAntialiasing]);
  
  // Update composer on resize
  const handleResize = () => {
    composer.setSize(size.width, size.height);
  };
  
  // Animation frame - render with post-processing
  useFrame(() => {
    // Adaptive bloom adjustment based on scene complexity
    if (adaptiveBloom && composer.passes[1]) {
      const bloomPass = composer.passes[1];
      const time = performance.now() * 0.001;
      
      // Dynamic bloom strength for breathing effect
      bloomPass.strength = bloomStrength + Math.sin(time * 0.5) * 0.3;
      
      // Adaptive threshold based on performance
      const fps = 1 / (performance.now() * 0.001 - time);
      if (fps < 30) {
        bloomPass.threshold = Math.min(bloomThreshold + 0.1, 0.5);
      } else {
        bloomPass.threshold = bloomThreshold;
      }
    }
    
    // Render with post-processing effects
    composer.render();
  }, 1);
  
  // Handle size changes
  useFrame(() => {
    if (composer.getSize().width !== size.width || composer.getSize().height !== size.height) {
      handleResize();
    }
  });
  
  return null;
};

/**
 * Selective Bloom Component
 * Applies bloom only to specific materials/objects
 */
export const SelectiveBloom = ({ 
  children, 
  bloomLayer = 1,
  bloomStrength = 2.0,
  bloomRadius = 1.0,
  bloomThreshold = 0.0 
}) => {
  const { gl, scene, camera, size } = useThree();
  const bloomComposer = useRef();
  const finalComposer = useRef();
  const renderTarget = useRef();
  
  // Materials for selective rendering
  const darkMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 'black' }), []);
  const originalMaterials = useRef({});
  
  // Setup selective bloom pipeline
  const setupBloomPipeline = useMemo(() => {
    // Render target for bloom layer
    const bloomRenderTarget = new THREE.WebGLRenderTarget(size.width, size.height, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    });
    renderTarget.current = bloomRenderTarget;
    
    // Bloom composer (renders only bloom objects)
    const bloomEffectComposer = new EffectComposer(gl, bloomRenderTarget);
    bloomEffectComposer.addPass(new RenderPass(scene, camera));
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );
    bloomEffectComposer.addPass(bloomPass);
    bloomEffectComposer.addPass(new OutputPass());
    
    bloomComposer.current = bloomEffectComposer;
    
    // Final composer (combines bloom with scene)
    const finalEffectComposer = new EffectComposer(gl);
    finalEffectComposer.addPass(new RenderPass(scene, camera));
    
    // Custom shader pass to combine bloom
    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomRenderTarget.texture },
          bloomStrength: { value: bloomStrength }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          uniform float bloomStrength;
          varying vec2 vUv;
          
          void main() {
            vec4 base = texture2D(baseTexture, vUv);
            vec4 bloom = texture2D(bloomTexture, vUv);
            
            // Additive blend with strength control
            vec3 result = base.rgb + bloom.rgb * bloomStrength;
            
            gl_FragColor = vec4(result, base.a);
          }
        `,
        defines: {}
      }),
      'baseTexture'
    );
    
    finalEffectComposer.addPass(finalPass);
    finalComposer.current = finalEffectComposer;
    
    return { bloomEffectComposer, finalEffectComposer };
  }, [gl, scene, camera, size, bloomStrength, bloomRadius, bloomThreshold]);
  
  // Utility functions for material swapping
  const darkenNonBloomed = (obj) => {
    if (obj.material && obj.layers.test(bloomLayer) === false) {
      originalMaterials.current[obj.uuid] = obj.material;
      obj.material = darkMaterial;
    }
  };
  
  const restoreMaterials = (obj) => {
    if (originalMaterials.current[obj.uuid]) {
      obj.material = originalMaterials.current[obj.uuid];
      delete originalMaterials.current[obj.uuid];
    }
  };
  
  // Render selective bloom
  useFrame(() => {
    // Render bloom objects only
    scene.traverse(darkenNonBloomed);
    bloomComposer.current.render();
    scene.traverse(restoreMaterials);
    
    // Render final combined scene
    finalComposer.current.render();
  }, 1);
  
  return <>{children}</>;
};

/**
 * Performance-Optimized Bloom for Mobile
 */
export const MobileBloom = ({ children, quality = 'medium' }) => {
  const qualitySettings = {
    low: {
      bloomStrength: 0.8,
      bloomRadius: 0.4,
      bloomThreshold: 0.3,
      renderScale: 0.5
    },
    medium: {
      bloomStrength: 1.2,
      bloomRadius: 0.6,
      bloomThreshold: 0.2,
      renderScale: 0.75
    },
    high: {
      bloomStrength: 1.8,
      bloomRadius: 0.9,
      bloomThreshold: 0.1,
      renderScale: 1.0
    }
  };
  
  const settings = qualitySettings[quality];
  
  return (
    <BloomEffects
      bloomStrength={settings.bloomStrength}
      bloomRadius={settings.bloomRadius}
      bloomThreshold={settings.bloomThreshold}
      enableAntialiasing={quality !== 'low'}
      adaptiveBloom={true}
    >
      {children}
    </BloomEffects>
  );
};

export default BloomEffects;