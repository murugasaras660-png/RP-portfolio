import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../data/site';
import { useLenis } from '../motion/lenis';
import { useReducedMotion } from '../motion/useReducedMotion';
import { motion } from 'framer-motion';

export default function Navbar({ showBrand = true }) {
  const [activeHash, setActiveHash] = useState('');
  const location = useLocation();
  const navRef = useRef(null);
  const lenis = useLenis();
  const lastScrollY = useRef(0);
  const reducedMotion = useReducedMotion();

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHash(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(s => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (!navRef.current || !lenis) return;

    const onScroll = (e) => {
      const current = e.animatedScroll;
      const nav = navRef.current;
      if (!nav) return;

      if (current > lastScrollY.current && current > 100) {
        nav.style.transform = 'translate(-50%, -150%)';
        nav.style.opacity = '0';
      } else {
        nav.style.transform = 'translate(-50%, 0%)';
        nav.style.opacity = '1';
      }

      lastScrollY.current = current;
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      aria-label="Main navigation"
    >
      {/* Brand — the loader flies to this exact element */}
      <Link 
        to="/" 
        className="px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity focus-visible flex items-center"
        aria-label="Home"
      >
        <motion.span
          data-nav-brand
          className="text-[var(--color-ink)] font-bold text-lg tracking-tight leading-none inline-block"
          initial={{ opacity: showBrand ? 1 : 0 }}
          animate={{ opacity: showBrand ? 1 : 0 }}
          transition={{ duration: 0 }}
        >
          {site.brand.replace('.', '')}<span className="text-accent">.</span>
        </motion.span>
      </Link>
      
      {/* Nav Items — fade in after brand arrives */}
      <motion.div 
        className="flex items-center gap-1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: showBrand ? 1 : 0, x: showBrand ? 0 : -10 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {navItems.map((item) => {
          const isActive = activeHash === item.id;
          return (
            <Link
              key={item.label}
              to={`/#${item.id}`}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.history.pushState({}, '', `/#${item.id}`);
                  if (lenis) {
                    lenis.scrollTo(`#${item.id}`, { duration: 1.2 });
                  } else {
                    document.getElementById(item.id)?.scrollIntoView();
                  }
                }
              }}
              className={`
                px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-accent text-[#0A0A0A]' 
                  : 'text-[var(--color-ink)] hover:text-accent'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
