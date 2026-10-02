import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { useLenis } from '../motion/lenis';
import { Icon } from '../components/Icon';
import { motion } from 'framer-motion';

export default function Projects() {
  const validProjects = projects.filter(p => p.title !== '[TO BE PROVIDED]');
  const lenis = useLenis();
  const containerRef = useRef(null);
  const deckRef = useRef(null);
  const cardsRef = useRef([]);
  const lastIdxRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop Scroll Logic
  useEffect(() => {
    // Only apply scroll logic on desktop (>= 640px)
    if (!lenis || !containerRef.current || window.innerWidth < 640) {
      if (containerRef.current) containerRef.current.style.height = 'auto';
      return;
    }

    const container = containerRef.current;
    const cards = cardsRef.current;
    const total = cards.length;
    
    const scrollPerCard = window.innerHeight * 0.4;
    const winW = window.innerWidth; // Cache to avoid forced reflow
    container.style.height = `calc(100vh + ${(total - 1) * 40}vh)`;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, -rect.top / scrollPerCard);
      
      // Only trigger React re-render when index actually changes
      const idx = Math.max(0, Math.min(total - 1, Math.round(progress)));
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setActiveIndex(idx);
      }

      for (let i = 0; i < total; i++) {
        const card = cards[i];
        if (!card) continue;
        
        const diff = i - progress;
        const s = card.style;
        
        if (diff <= 0) {
          const flingProgress = Math.max(-1, diff); 
          const x = flingProgress * winW * 0.8;
          const rotate = flingProgress * 15;
          const opacity = 1 + flingProgress;
          
          s.transform = `translate3d(${x}px,0,0) rotate(${rotate}deg)`;
          s.opacity = Math.max(0, opacity);
          s.zIndex = 20 + i;
          s.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
        } else {
          const y = diff * 40;
          const scale = Math.max(0.8, 1 - diff * 0.04);
          const opacity = Math.max(0, 1 - diff * 0.2);
          
          s.transform = `translate3d(0,${y}px,0) scale(${scale})`;
          s.opacity = opacity;
          s.zIndex = 20 - i;
          s.pointerEvents = diff < 0.5 ? 'auto' : 'none';
        }
      }
    };

    lenis.on('scroll', onScroll);
    onScroll();
    
    const onResize = () => {
      if (window.innerWidth < 640) {
        container.style.height = 'auto';
      } else {
        container.style.height = `calc(100vh + ${(total - 1) * 40}vh)`;
        onScroll();
      }
    };
    window.addEventListener('resize', onResize);
    
    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [lenis]);

  const scrollToCard = (index) => {
    if (!lenis || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollPerCard = window.innerHeight * 0.4;
    const targetScroll = window.scrollY + rect.top + (index * scrollPerCard);
    
    cardsRef.current.forEach(card => {
      if (card) card.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    });
    
    lenis.scrollTo(targetScroll, { duration: 1.2 });
    
    setTimeout(() => {
      cardsRef.current.forEach(card => {
        if (card) card.style.transition = 'none';
      });
    }, 1200);
  };

  if (validProjects.length === 0) return null;

  return (
    <section id="work" ref={containerRef} className="relative z-10 bg-transparent">
      
      {/* ========================================= */}
      {/* DESKTOP VIEW (Sticky Scroll Deck)         */}
      {/* ========================================= */}
      <div className="hidden sm:flex sticky top-0 h-screen overflow-hidden flex-col justify-center">
        <div className="container h-full max-h-[900px] flex flex-col justify-center py-24 relative">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-accent text-meta font-medium tracking-widest uppercase">03</span>
              <h2 className="text-h3 font-medium">Selected Work</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-meta font-medium tracking-widest text-muted">
                0{activeIndex + 1} / 0{validProjects.length}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30"
                  disabled={activeIndex === 0}
                >
                  <Icon name="arrow-left" size={16} />
                </button>
                <button 
                  onClick={() => scrollToCard(Math.min(validProjects.length - 1, activeIndex + 1))}
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30"
                  disabled={activeIndex === validProjects.length - 1}
                >
                  <Icon name="arrow-right" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div 
            ref={deckRef}
            className="relative w-full h-[65vh] md:h-[70vh] perspective-1000 select-none"
            style={{ perspective: '1200px' }}
          >
            {validProjects.map((p, i) => (
              <div 
                key={p.slug}
                ref={el => cardsRef.current[i] = el}
                className="absolute inset-0 w-full h-full bg-[var(--color-surface)] text-[var(--color-ink)] rounded-2xl overflow-hidden shadow-2xl origin-bottom flex flex-col md:flex-row border border-[var(--color-line)] will-change-transform"
              >
                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col h-full relative z-10 w-full md:w-1/2 justify-between bg-[var(--color-surface)]">
                  <div>
                    <span className="text-accent text-meta font-medium tracking-wider mb-6 block">PROJECT 0{i + 1}</span>
                    <h3 className="text-h2 font-semibold mb-4">{p.title}</h3>
                    {p.summary !== '[TO BE PROVIDED]' && (
                      <p className="text-body text-[var(--color-muted)] max-w-xl mb-8">{p.summary}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.stack?.filter(s => s !== '[TO BE PROVIDED]').map(tech => (
                        <span key={tech} className="text-xs px-3 py-1 bg-[var(--color-bg)] rounded-full text-[var(--color-muted)] border border-[var(--color-line)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-3 text-accent font-medium mt-auto group focus-visible w-fit px-6 py-3 border border-accent rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    View Project 
                    <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Media */}
                <div className="w-full md:w-1/2 h-full relative overflow-hidden bg-[var(--color-bg)]">
                  {p.image && p.image !== '[TO BE PROVIDED]' ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-90" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center border-l border-[var(--color-line)]">
                      <span className="text-[var(--color-muted)] text-meta">No Image Provided</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MOBILE VIEW (Standard Native Flow List)   */}
      {/* ========================================= */}
      <div className="sm:hidden container py-16 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-accent text-meta font-medium tracking-widest uppercase">03</span>
          <h2 className="text-h3 font-medium">Selected Work</h2>
        </div>

        <div className="flex flex-col gap-10 w-full">
          {validProjects.map((p, i) => (
            <motion.div 
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[var(--color-surface)] text-[var(--color-ink)] rounded-2xl overflow-hidden shadow-xl flex flex-col border border-[var(--color-line)]"
            >
              <div className="h-[250px] overflow-hidden relative w-full border-b border-[var(--color-line)]">
                {p.image && p.image !== '[TO BE PROVIDED]' ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-[var(--color-bg)] flex items-center justify-center">
                    <span className="text-[var(--color-muted)] text-meta">No Image Provided</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col">
                <span className="text-accent text-meta font-medium tracking-wider mb-2 block">PROJECT 0{i + 1}</span>
                <h3 className="text-h3 font-semibold mb-3">{p.title}</h3>
                {p.summary !== '[TO BE PROVIDED]' && (
                  <p className="text-body text-[var(--color-muted)] mb-6 leading-relaxed">{p.summary}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack?.filter(s => s !== '[TO BE PROVIDED]').slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-1 bg-[var(--color-bg)] rounded-full text-[var(--color-muted)] border border-[var(--color-line)]">
                      {tech}
                    </span>
                  ))}
                  {p.stack && p.stack.length > 3 && (
                    <span className="text-[10px] px-2 py-1 bg-[var(--color-bg)] rounded-full text-[var(--color-muted)] border border-[var(--color-line)]">
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>

                <Link 
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center justify-center gap-2 text-white bg-accent font-medium mt-auto w-full py-3.5 rounded-xl hover:bg-accent-hi transition-colors"
                >
                  View Project <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
