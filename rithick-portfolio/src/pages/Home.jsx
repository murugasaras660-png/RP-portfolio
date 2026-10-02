import { useEffect } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Learning from '../sections/Learning';
import FinalStatement from '../sections/FinalStatement';
import Contact from '../sections/Contact';
import { useLenis } from '../motion/lenis';
import { Skiper28 } from '../components/ui/skiper-ui/skiper28';

export default function Home() {
  const lenis = useLenis();

  // Hash routing for anchors since this is an SPA on one page
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(element, { immediate: true });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
          element.setAttribute('tabindex', '-1');
          element.focus({ preventScroll: true });
        }, 100);
      }
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [lenis]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Learning />
      <FinalStatement />
      <Skiper28 />
      <Contact />
    </>
  );
}
