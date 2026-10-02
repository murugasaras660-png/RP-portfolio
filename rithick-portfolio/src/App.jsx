import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import { LenisProvider } from './motion/lenis';
import { BackgroundLine } from './components/BackgroundLine';
import { RPLoader } from './components/RPLoader';
import { SplineBackground } from './components/SplineBackground';

// Lazy load routes to reduce initial bundle size and JS execution
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();
  // Phase: 'loading' → 'transitioning' → 'ready'
  const [phase, setPhase] = useState('loading');

  const handleLoaderDone = useCallback(() => {
    setPhase('transitioning');
  }, []);

  const handleTransitionDone = useCallback(() => {
    setPhase('ready');
  }, []);

  // Focus h1 on route change for a11y
  useEffect(() => {
    if (phase !== 'ready') return;
    const h1 = document.querySelector('h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
  }, [location.pathname, phase]);

  return (
    <LenisProvider>
      {/* RP Loader — always mounted until 'ready', handles its own animation phases */}
      {phase !== 'ready' && (
        <RPLoader 
          phase={phase} 
          onLoadingDone={handleLoaderDone} 
          onTransitionDone={handleTransitionDone} 
        />
      )}

      {/* Main content — render once transitioning starts so navbar position is measurable */}
      {phase !== 'loading' && (
        <div style={{ opacity: phase === 'ready' ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          
          {/* Spline 3D Background — deepest layer. Pass isReady to delay WebGL init */}
          <SplineBackground isReady={phase === 'ready'} />

          {/* Scroll Path Line */}
          <div className="fixed inset-0 z-[1] pointer-events-none opacity-20">
            <BackgroundLine className="w-full h-[300vh]" />
          </div>
          
          {/* Content layer */}
          <div className="content-layer relative z-[2]">
            <Navbar showBrand={phase === 'ready'} />
            <main id="main-content">
              <Suspense fallback={<div className="h-screen w-full" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          
          {/* Aria live region for route announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only" id="route-announcer">
            {location.pathname === '/' ? 'Rithick Prasath Portfolio' : ''}
          </div>
        </div>
      )}
    </LenisProvider>
  );
}
