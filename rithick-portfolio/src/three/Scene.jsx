import { useEffect, useRef } from 'react';

export default function Scene() {
  const canvasRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Lazy import Three.js for code splitting
    let cleanup = null;
    
    import('./init.js').then(({ initScene }) => {
      if (!canvasRef.current) return;
      cleanup = initScene(canvasRef.current);
    }).catch(err => {
      console.warn('WebGL not available:', err);
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      aria-hidden="true"
    />
  );
}
