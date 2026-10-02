import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';

/**
 * RPLoader — Liquid Glass Brand Reveal
 * 
 * Phase 1 (loading): "RP." appears inside a liquid glass orb, center screen
 * Phase 2 (transitioning): Glass orb morphs and flies to navbar brand position
 * Phase 3: calls onTransitionDone → parent removes loader & shows site
 */
export function RPLoader({ phase, onLoadingDone, onTransitionDone }) {
  const controls = useAnimationControls();
  const orbControls = useAnimationControls();
  const rpRef = useRef(null);
  const [targetPos, setTargetPos] = useState(null);

  // Phase 1: Liquid glass intro
  useEffect(() => {
    const sequence = async () => {
      // Glass orb expands
      orbControls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
      });

      // RP text materializes inside the glass
      await controls.start({
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
      });

      // Hold
      await new Promise(r => setTimeout(r, 800));

      onLoadingDone();
    };

    sequence();
  }, []);

  // Phase 2: Measure navbar brand position
  useEffect(() => {
    if (phase !== 'transitioning') return;

    const raf = requestAnimationFrame(() => {
      const navBrand = document.querySelector('[data-nav-brand]');
      
      if (navBrand && rpRef.current) {
        const navRect = navBrand.getBoundingClientRect();
        const rpRect = rpRef.current.getBoundingClientRect();
        
        const deltaX = navRect.left + navRect.width / 2 - (rpRect.left + rpRect.width / 2);
        const deltaY = navRect.top + navRect.height / 2 - (rpRect.top + rpRect.height / 2);
        
        // Use width to compute accurate scale for text
        const targetScale = navRect.width / rpRect.width;

        setTargetPos({ deltaX, deltaY, targetScale });
      } else {
        setTargetPos({ deltaX: 0, deltaY: -window.innerHeight / 2 + 40, targetScale: 0.25 });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Animate the flight
  useEffect(() => {
    if (!targetPos) return;

    const flySequence = async () => {
      // Shrink glass orb as RP flies
      orbControls.start({
        scale: 0.3,
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      });

      // RP flies to navbar seamlessly without fading out!
      await controls.start({
        x: targetPos.deltaX,
        y: targetPos.deltaY,
        scale: targetPos.targetScale,
        textShadow: '0 0 0px rgba(244,86,14,0), 0 0 0px rgba(244,86,14,0)',
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }
      });

      // Instantly hand off to the real Navbar!
      onTransitionDone();
    };

    flySequence();
  }, [targetPos]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: '#0A0A0A' }}
      animate={phase === 'transitioning' && targetPos ? { 
        backgroundColor: 'rgba(10, 10, 10, 0)' 
      } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* === LIQUID GLASS ORB === */}
      <motion.div
        className="absolute rounded-full"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={orbControls}
        style={{
          width: 280,
          height: 280,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(244,86,14,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 80%)
          `,
          backdropFilter: 'blur(40px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `
            0 0 80px rgba(244,86,14,0.08),
            0 0 160px rgba(244,86,14,0.04),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Inner glass reflection arc */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '8%',
            left: '15%',
            width: '70%',
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
        />
      </motion.div>

      {/* === Ambient particles floating inside the glass === */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            background: i % 2 === 0 ? 'rgba(244,86,14,0.4)' : 'rgba(255,255,255,0.15)',
          }}
          initial={{
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            opacity: 0,
          }}
          animate={{
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* === Outer ring pulse === */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          border: '1px solid rgba(244,86,14,0.1)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.05, 0.9], 
          opacity: [0, 0.5, 0] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      />

      {/* === THE RP. TEXT === */}
      <motion.div
        ref={rpRef}
        className="relative select-none cursor-default z-10"
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
        animate={controls}
      >
        <span 
          className="text-[72px] md:text-[100px] font-bold tracking-tight leading-none"
          style={{ 
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-ink)',
            textShadow: '0 0 40px rgba(244,86,14,0.3), 0 0 80px rgba(244,86,14,0.1)',
          }}
        >
          {site.brand.replace('.', '')}
          <span className="text-accent">.</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
