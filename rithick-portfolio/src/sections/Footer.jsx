import { site } from '../data/site';
import { Icon } from '../components/Icon';
import { useLenis } from '../motion/lenis';

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 py-8 border-t border-line bg-surface/80 backdrop-blur">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-semibold text-ink">{site.brand}</span>
          <span className="text-meta text-muted">© {site.footerYear} {site.name}. All rights reserved.</span>
        </div>

        <button 
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-ink text-bg flex items-center justify-center hover:bg-accent focus-visible transition-colors relative group"
          aria-label="Back to top"
        >
          <div className="absolute inset-0 pointer-events-none rounded-full bg-line/20 group-hover:bg-accent/20 transition-colors">
          </div>
          <Icon name="chevron-up" size={20} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
