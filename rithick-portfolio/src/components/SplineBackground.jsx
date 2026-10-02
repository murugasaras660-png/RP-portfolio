import { useState, useEffect, memo } from 'react';

const SPLINE_SCENE = 'https://prod.spline.design/QElcHUOKPtrzCYDl/scene.splinecode';

function SplineBackgroundInner({ isReady }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isReady) return; // Wait for initial app loading/transition phase to finish

    // Dynamically load the spline-viewer script asynchronously
    const script = document.createElement('script');
    script.type = 'module';
    script.async = true; // Never block main thread
    script.src = 'https://cdn.spline.design/@splinetool/viewer@2.0.65/build/spline-viewer.js';
    
    // We can listen to the load event of the script or the viewer itself.
    // For simplicity, we'll just fade it in slightly after the script loads.
    script.onload = () => {
      // Small delay to ensure the web component has initialized and compiled its shaders
      setTimeout(() => setLoaded(true), 1500);
    };
    
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isReady]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        opacity: loaded ? 0.35 : 0,
        transition: 'opacity 2s ease',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Render the custom web component */}
        {/* @ts-ignore - React doesn't know about this custom element type */}
        <spline-viewer
          url={SPLINE_SCENE}
          style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            transform: 'scale(1.08)',
            transformOrigin: 'center center',
          }}
        ></spline-viewer>
      </div>
    </div>
  );
}

export const SplineBackground = memo(SplineBackgroundInner);

