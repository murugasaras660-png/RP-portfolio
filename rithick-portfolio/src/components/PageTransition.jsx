import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, onScroll, utils } from 'animejs';
import { DUR_BASE, EASE_IN_OUT } from '../motion/tokens';
import { useReducedMotion } from '../motion/useReducedMotion';

export default function PageTransition({ children }) {
  const elRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !elRef.current) {
      if (elRef.current) elRef.current.style.opacity = '1';
      return;
    }

    // Reveal from sweep
    animate(elRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: DUR_BASE,
      ease: EASE_IN_OUT,
    });
  }, [reducedMotion]);

  return (
    <div ref={elRef} className="will-change-transform opacity-0">
      {children}
    </div>
  );
}
