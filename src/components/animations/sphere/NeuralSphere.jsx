'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { detectPerformanceLevel, SphereAnimationController } from './components/SphereControls';
import BloomEffects, { MobileBloom } from './components/BloomEffects';
import AnimatedSphere from './components/AnimatedSphere';

/**
 * Main Neural Sphere Component for TutorAI Hero Section
 * Replaces CognitiveCore with advanced 3D neural network visualization
 */

// Loading fallback component
const SphereLoadingFallback = ({ className = "", style = {} }) => (
  <div 
    className={`neural-sphere-loading ${className}`}
    style={{
      width: '100%',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle, rgba(16,24,39,0.8) 0%, rgba(9,14,24,0.9) 100%)',
      borderRadius: '20px',
      ...style
    }}
  >
    <div className="loading-animation">
      <div className="neural-pulse"></div>
      <p className="loading-text">Inizializzazione Neural Core...</p>
    </div>
    
    <style jsx>{`
      .loading-animation {
        text-align: center;
        color: rgba(59, 130, 246, 0.8);
      }
      
      .neural-pulse {
        width: 60px;
        height: 60px;
        border: 2px solid rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        margin: 0 auto 16px;
        position: relative;
        animation: neural-pulse 2s infinite ease-in-out;
      }
      
      .neural-pulse::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: rgba(16, 185, 129, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: neural-glow 1.5s infinite ease-in-out alternate;
      }
      
      @keyframes neural-pulse {
        0%, 100% { 
          transform: scale(1);
          border-color: rgba(59, 130, 246, 0.3);
        }
        50% { 
          transform: scale(1.1);
          border-color: rgba(59, 130, 246, 0.7);
        }
      }
      
      @keyframes neural-glow {
        0% { 
          background: rgba(16, 185, 129, 0.6);
          transform: translate(-50%, -50%) scale(1);
        }
        100% { 
          background: rgba(16, 185, 129, 1);
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
      
      .loading-text {
        font-size: 14px;
        font-weight: 500;
        margin: 0;
        opacity: 0.8;
      }
    `}</style>
  </div>
);

// Error fallback component  
const SphereErrorFallback = ({ error, retry, className = "", style = {} }) => (
  <div 
    className={`neural-sphere-error ${className}`}
    style={{
      width: '100%', 
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(16,24,39,0.95) 0%, rgba(9,14,24,0.98) 100%)',
      borderRadius: '20px',
      border: '1px solid rgba(239,68,68,0.2)',
      ...style
    }}
  >
    <div className="error-content">
      <div className="error-icon">⚠️</div>
      <h3>Errore Neural Core</h3>
      <p>Impossibile inizializzare l'animazione 3D</p>
      <button onClick={retry} className="retry-button">
        Riprova
      </button>
    </div>
    
    <style jsx>{`
      .error-content {
        text-align: center;
        color: rgba(239, 68, 68, 0.9);
      }
      
      .error-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .error-content h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: rgba(239, 68, 68, 1);
      }
      
      .error-content p {
        font-size: 14px;
        margin: 0 0 20px 0;
        opacity: 0.8;
        color: rgba(156, 163, 175, 1);
      }
      
      .retry-button {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
        color: rgba(59, 130, 246, 1);
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      }
      
      .retry-button:hover {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.5);
      }
    `}</style>
  </div>
);

// Main neural sphere wrapper
const NeuralSphere = ({ 
  className = "",
  style = {},
  radius = 2.5,
  enableBloom = true,
  performanceLevel = "auto",
  fallbackMode = false 
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [detectedPerformance, setDetectedPerformance] = useState('medium');
  const [isMobile, setIsMobile] = useState(false);
  
  // Performance detection and mobile check
  useEffect(() => {
    const performance = detectPerformanceLevel();
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    setDetectedPerformance(performance);
    setIsMobile(mobile);
  }, []);
  
  // Error boundary logic
  const handleError = (error) => {
    console.error('Neural Sphere Error:', error);
    setHasError(true);
  };
  
  const handleRetry = () => {
    setHasError(false);
    setRetryCount(prev => prev + 1);
  };
  
  // Force fallback mode for very low-end devices
  const shouldUseFallback = fallbackMode || (detectedPerformance === 'low' && isMobile);
  
  // Fallback static sphere for low-end devices
  if (shouldUseFallback) {
    return (
      <div 
        className={`neural-sphere-fallback ${className}`}
        style={{
          width: '100%',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      >
        <div className="static-neural-core">
          <div className="core-ring"></div>
          <div className="core-center"></div>
        </div>
        
        <style jsx>{`
          .static-neural-core {
            position: relative;
            width: 200px;
            height: 200px;
          }
          
          .core-ring {
            width: 100%;
            height: 100%;
            border: 2px solid rgba(59, 130, 246, 0.4);
            border-radius: 50%;
            animation: static-rotate 8s linear infinite;
          }
          
          .core-center {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.2) 100%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: static-pulse 2s ease-in-out infinite alternate;
          }
          
          @keyframes static-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes static-pulse {
            from { 
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
            }
            to { 
              box-shadow: 0 0 40px rgba(16, 185, 129, 0.8);
            }
          }
        `}</style>
      </div>
    );
  }
  
  // Error state
  if (hasError) {
    return (
      <SphereErrorFallback 
        error={hasError}
        retry={handleRetry}
        className={className}
        style={style}
      />
    );
  }
  
  // Main 3D sphere with performance optimization
  const finalPerformanceLevel = performanceLevel === 'auto' ? detectedPerformance : performanceLevel;
  
  return (
    <div 
      className={`neural-sphere-wrapper ${className}`}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        ...style
      }}
      key={retryCount} // Force remount on retry
    >
      <SphereAnimationController
        autoPerformance={true}
        forcedPerformanceLevel={finalPerformanceLevel}
      >
        <Suspense fallback={<SphereLoadingFallback className={className} style={style} />}>
          <ErrorBoundary onError={handleError}>
            {enableBloom && isMobile ? (
              <MobileBloom quality={finalPerformanceLevel}>
                <AnimatedSphere 
                  radius={radius}
                  className="neural-sphere-canvas"
                  style={{ width: '100%', height: '100%' }}
                  performanceLevel={finalPerformanceLevel}
                />
              </MobileBloom>
            ) : enableBloom ? (
              <BloomEffects
                bloomStrength={finalPerformanceLevel === 'high' ? 2.0 : 1.2}
                bloomRadius={1.0}
                bloomThreshold={0.1}
                enableAntialiasing={!isMobile}
                adaptiveBloom={true}
              >
                <AnimatedSphere 
                  radius={radius}
                  className="neural-sphere-canvas"
                  style={{ width: '100%', height: '100%' }}
                  performanceLevel={finalPerformanceLevel}
                />
              </BloomEffects>
            ) : (
              <AnimatedSphere 
                radius={radius}
                className="neural-sphere-canvas"
                style={{ width: '100%', height: '100%' }}
                performanceLevel={finalPerformanceLevel}
              />
            )}
          </ErrorBoundary>
        </Suspense>
      </SphereAnimationController>
      
      {/* Performance indicator (dev mode only) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          {finalPerformanceLevel.toUpperCase()}
        </div>
      )}
    </div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error);
  }
  
  render() {
    if (this.state.hasError) {
      return null; // Let parent handle error display
    }
    
    return this.props.children;
  }
}

// CSS Module for global neural sphere styles
export const neuralSphereStyles = `
  .neural-sphere-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .neural-sphere-canvas {
    width: 100% !important;
    height: 100% !important;
  }
  
  .neural-sphere-wrapper {
    background: radial-gradient(ellipse at center, rgba(16,24,39,0.3) 0%, transparent 70%);
    border-radius: 20px;
  }
  
  @media (max-width: 768px) {
    .neural-sphere-wrapper {
      height: 300px !important;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .neural-sphere-wrapper * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default NeuralSphere;