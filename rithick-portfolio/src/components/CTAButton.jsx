import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { useLenis } from '../motion/lenis';

export function CTAButton({ 
  to, 
  href, 
  variant = 'primary', 
  children, 
  icon = 'arrow-right',
  className = '',
  ...props 
}) {
  const lenis = useLenis();
  const isPrimary = variant === 'primary';
  
  const baseClasses = `
    inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-medium text-button
    transition-all duration-300 ease-out focus-visible group relative
    overflow-hidden
  `;
  
  const variantClasses = isPrimary 
    ? 'bg-accent text-ink hover:bg-accent-hi hover:-translate-y-0.5 hover:shadow-[0_4px_24px_var(--color-glow)]'
    : 'bg-ink text-cream hover:bg-ink-2 hover:-translate-y-0.5';

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  const Inner = () => (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <Icon 
          name={icon} 
          size={18} 
          className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1" 
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        <Inner />
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      className={combinedClasses} 
      onClick={(e) => {
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            window.history.pushState({}, '', href);
            if (lenis) {
              lenis.scrollTo(target, { duration: 1.2 });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }}
      {...props}
    >
      <Inner />
    </a>
  );
}
