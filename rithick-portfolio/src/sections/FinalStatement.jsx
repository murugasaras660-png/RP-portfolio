import { site } from '../data/site';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FinalStatement() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  if (site.statementText === '[TO BE PROVIDED]') return null;

  return (
    <section 
      ref={containerRef}
      className="relative z-10 overflow-hidden py-32 md:py-48 flex items-center justify-center border-t border-[var(--color-line)] bg-transparent"
    >
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] text-[var(--color-ink)] uppercase">
          {site.statementText.split('.').map((part, i, arr) => {
            if (!part.trim()) return null;
            return (
              <span key={i} className="block hover:text-accent transition-colors duration-500 cursor-default">
                {part.trim()}.
              </span>
            );
          })}
        </h2>
      </motion.div>
    </section>
  );
}
