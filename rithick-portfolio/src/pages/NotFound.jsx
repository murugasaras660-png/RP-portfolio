import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center container">
        <h1 className="text-display font-semibold mb-6">404</h1>
        <p className="text-lead text-muted mb-10 max-w-md">
          The page or project you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-ink font-medium rounded-sm hover:bg-accent-hi transition-colors focus-visible"
        >
          <Icon name="arrow-left" size={18} />
          Return Home
        </Link>
      </div>
    </PageTransition>
  );
}
