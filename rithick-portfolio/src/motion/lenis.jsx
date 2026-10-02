import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1,
    });

    setLenis(instance);

    function raf(time) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
