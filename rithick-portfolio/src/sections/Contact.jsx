import { site } from '../data/site';
import { Icon } from '../components/Icon';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SocialCard = ({ href, name, iconName, index, centerIndex, scrollYProgress }) => {
  // Use "#" if the link is not provided yet, so it stays clickable
  const linkHref = href === '[TO BE PROVIDED]' ? '#' : href;
  const isExternal = linkHref !== '#';

  const distanceFromCenter = index - centerIndex;
  
  // Scatter from a wider arc and settle into 0
  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 80, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [Math.abs(distanceFromCenter) * 60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.5, 1]);

  return (
    <motion.div style={{ x, y, scale, opacity }}>
      <a
        href={linkHref}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        className="inline-flex flex-col items-center justify-center gap-2 w-24 h-28 md:w-28 md:h-32 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg hover:shadow-[0_10px_30px_rgba(244,86,14,0.15)] transition-[transform,box-shadow,border-color,opacity] duration-300 group cursor-pointer relative overflow-hidden hover:border-[var(--color-accent)] hover:-translate-y-2 hover:scale-105 block"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10 text-[var(--color-ink)] group-hover:text-accent">
          <Icon name={iconName} size={32} />
        </div>
        <span className="text-[11px] md:text-sm font-medium text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-colors tracking-wide relative z-10">
          {name}
        </span>
      </a>
    </motion.div>
  );
};

export default function Contact() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  return (
    <section ref={containerRef} id="contact" className="section-padding relative z-10 pt-32 pb-48 bg-transparent overflow-hidden">
      <div className="container max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8 justify-center"
        >
          <span className="text-accent text-meta font-medium tracking-widest uppercase">05</span>
          <h2 className="text-h3 font-medium">Contact</h2>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-h2 font-medium mb-16 text-[var(--color-muted)] max-w-xl"
        >
          Interested in working together or have a question?
        </motion.h3>

        {site.email !== '[TO BE PROVIDED]' && (
          <motion.a 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href={`mailto:${site.email}`} 
            className="group relative inline-flex items-center gap-4 px-8 py-5 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-accent hover:shadow-[0_0_30px_rgba(244,86,14,0.15)] transition-all duration-500 mb-24 z-20"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-ink)] text-bg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-500">
              <Icon name="mail" size={24} />
            </div>
            <span className="text-h3 font-semibold tracking-tight text-[var(--color-ink)] group-hover:text-accent transition-colors duration-500">
              {site.email}
            </span>
          </motion.a>
        )}

        <div className="flex justify-center gap-4 md:gap-8 mt-12 pt-16 border-t border-[var(--color-line)] w-full">
          <SocialCard index={0} centerIndex={1} scrollYProgress={scrollYProgress} href={site.github || '[TO BE PROVIDED]'} name="GitHub" iconName="github" />
          <SocialCard index={1} centerIndex={1} scrollYProgress={scrollYProgress} href={site.linkedin || '[TO BE PROVIDED]'} name="LinkedIn" iconName="linkedin" />
          <SocialCard index={2} centerIndex={1} scrollYProgress={scrollYProgress} href={site.instagram || '[TO BE PROVIDED]'} name="Instagram" iconName="instagram" />
        </div>
      </div>
    </section>
  );
}
