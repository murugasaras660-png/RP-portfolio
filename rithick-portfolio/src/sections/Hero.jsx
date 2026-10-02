import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { site } from '../data/site';
import { CTAButton } from '../components/CTAButton';
import { useLenis } from '../motion/lenis';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: { 
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Hero() {
  const lenis = useLenis();
  const textRingRef = useRef(null);

  useEffect(() => {
    if (!lenis || !textRingRef.current) return;
    
    const onScroll = (e) => {
      if (textRingRef.current) {
        textRingRef.current.style.transform = `rotate(${e.animatedScroll * 0.12}deg)`;
      }
    };
    
    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  const headlineChars = site.headline.split('');

  return (
    <section id="hero" className="relative h-[100svh] flex items-center overflow-hidden z-10">
      {/* Peach/Orange radial wash */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_30%,var(--color-bg-wash)_0%,transparent_50%)]" aria-hidden="true" />
      
      {/* Scroll Cue Pill */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-32 rounded-full bg-[var(--color-line)] hidden md:flex justify-center py-2 cursor-pointer" onClick={() => {
        const about = document.getElementById('about');
        if (about) {
          if (lenis) lenis.scrollTo(about, { duration: 1.2 });
          else about.scrollIntoView({behavior: 'smooth'});
        }
      }}>
        <motion.div 
          className="w-4 h-4 rounded-full bg-accent shadow-lg"
          animate={{ y: [0, 80, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left: Text */}
          <div className="lg:col-span-7">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent font-semibold tracking-wider uppercase mb-6 text-sm"
            >
              {site.role}
            </motion.p>
            
            <motion.h1 
              className="text-display font-semibold leading-[1.05] tracking-tight mb-8 text-[var(--color-ink)] perspective-[1000px]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label={site.headline}
            >
              {headlineChars.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="inline-block origin-bottom"
                  style={{ transformStyle: 'preserve-3d' }}
                  aria-hidden="true"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            
            {site.lead !== '[TO BE PROVIDED]' && (
              <motion.p 
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="text-lead text-[var(--color-muted)] max-w-[50ch] mb-10"
              >
                {site.lead}
              </motion.p>
            )}
            
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <CTAButton href="#work" icon="arrow-down" variant="primary">
                View My Work
              </CTAButton>
              <CTAButton href={site.resumePath !== '[TO BE PROVIDED]' ? site.resumePath : '#'} icon="arrow-right" variant="secondary" target="_blank" rel="noopener noreferrer">
                Download Resume
              </CTAButton>
            </motion.div>
          </div>
          
          {/* Right: Decorative */}
          <div className="lg:col-span-5 relative h-full flex items-center justify-center pointer-events-none hidden lg:flex">
            
            {/* Text Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] z-0 opacity-40">
              <svg viewBox="0 0 400 400" className="w-full h-full" ref={textRingRef}>
                <path id="curve" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="transparent" />
                <text className="text-[13px] font-medium tracking-[0.3em] uppercase" fill="var(--color-ink)" opacity="0.6">
                  <textPath href="#curve" startOffset="0%">
                    {site.ringText}
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Orange Ellipse */}
            <motion.div 
              className="w-64 h-64 rounded-full bg-accent/20 blur-3xl absolute"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Tilted Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/#work" className="pointer-events-auto bg-[var(--color-surface)] backdrop-blur-md p-6 rounded-xl border border-[var(--color-line)] shadow-2xl block rotate-6 hover:rotate-2 transition-transform duration-500 max-w-[220px] z-20 relative">
                <span className="text-meta font-medium text-accent block mb-3 tracking-wider">FEATURED WORK</span>
                <ul className="text-sm font-medium text-[var(--color-ink)] space-y-1.5">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Thinko AI</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Student Management</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>AI OS Assistant</li>
                </ul>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
