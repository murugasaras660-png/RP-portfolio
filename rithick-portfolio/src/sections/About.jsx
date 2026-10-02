import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '../data/site';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"]
  });

  if (site.description === '[TO BE PROVIDED]') return null;

  const words = site.description.split(' ');

  return (
    <section id="about" className="section-padding relative z-10" ref={ref}>
      <div className="container max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-accent text-meta font-medium tracking-widest uppercase">01</span>
          <h2 className="text-h3 font-medium">About</h2>
          <span className="w-12 h-px bg-accent/30 hidden md:block"></span>
        </motion.div>
        
        <p className="text-h2 font-medium leading-[1.3] tracking-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block text-[var(--color-ink)]">
      {word}
    </motion.span>
  );
}
