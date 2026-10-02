import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Icon } from '../components/Icon';
import PageTransition from '../components/PageTransition';
import { useLenis } from '../motion/lenis';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [slug, lenis]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[currentIndex + 1] || projects[0];

  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen container max-w-4xl">
        <Link 
          to="/#work" 
          className="link inline-flex items-center gap-2 text-muted hover:text-ink focus-visible:text-ink mb-12 text-meta font-medium tracking-wide"
        >
          <Icon name="arrow-left" size={16} />
          <span>BACK TO WORK</span>
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-accent text-meta font-medium">PROJECT 0{currentIndex + 1}</span>
            <span className="w-12 h-px bg-line"></span>
          </div>
          
          <h1 className="text-display font-semibold leading-tight tracking-tight mb-6">
            {project.title}
          </h1>
          
          {project.summary !== '[TO BE PROVIDED]' && (
            <p className="text-lead text-muted max-w-measure">
              {project.summary}
            </p>
          )}
        </header>

        {project.image && project.image !== '[TO BE PROVIDED]' && (
          <div className="mb-20 rounded-md overflow-hidden border border-line bg-surface aspect-[16/10]">
            <img 
              src={project.image} 
              alt={`Cover for ${project.title}`}
              className="w-full h-full object-cover"
              fetchpriority="high"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 mb-24">
          <div className="md:col-span-8 space-y-16">
            {project.problem !== '[TO BE PROVIDED]' && (
              <section>
                <h2 className="text-h3 font-semibold mb-4">Problem</h2>
                <p className="text-body text-muted">{project.problem}</p>
              </section>
            )}
            
            {project.solution !== '[TO BE PROVIDED]' && (
              <section>
                <h2 className="text-h3 font-semibold mb-4">What I Built</h2>
                <p className="text-body text-muted">{project.solution}</p>
              </section>
            )}

            {project.contribution !== '[TO BE PROVIDED]' && (
              <section>
                <h2 className="text-h3 font-semibold mb-4">My Contribution</h2>
                <p className="text-body text-muted">{project.contribution}</p>
              </section>
            )}

            {project.outcomes?.length > 0 && (
              <section>
                <h2 className="text-h3 font-semibold mb-4">Key Features & Outcomes</h2>
                <ul className="space-y-4">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i} className="flex gap-4 items-start text-body text-muted border-t border-line pt-4">
                      <span className="text-accent mt-1">•</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="md:col-span-4 space-y-10">
            {project.stack?.length > 0 && project.stack[0] !== '[TO BE PROVIDED]' && (
              <div>
                <h3 className="text-meta font-medium tracking-wider text-ink mb-4 uppercase">Technology</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="chip text-sm px-3 py-1.5 border border-line-strong rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-6 border-t border-line">
              {project.github !== '[TO BE PROVIDED]' && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link flex items-center justify-between text-body font-medium group"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="github" size={20} />
                    GitHub Repo
                  </span>
                  <Icon name="external" size={16} className="text-muted group-hover:text-ink transition-colors" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
              
              {project.demo !== '[TO BE PROVIDED]' && (
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link flex items-center justify-between text-body font-medium group"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="external" size={20} />
                    Live Demo
                  </span>
                  <Icon name="arrow-up-right" size={16} className="text-muted group-hover:text-ink transition-colors" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {projects.length > 1 && (
          <div className="pt-12 border-t border-line flex flex-col items-center justify-center text-center">
            <span className="text-meta font-medium text-muted mb-4 uppercase tracking-wider">Next Project</span>
            <Link 
              to={`/projects/${nextProject.slug}`}
              className="link text-h3 font-semibold hover:text-accent focus-visible:text-accent transition-colors flex items-center gap-3"
            >
              {nextProject.title}
              <Icon name="arrow-right" size={24} />
            </Link>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
