import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

// ─── Stunning Premium Tech Icons ──────────────────────────
const techIcons = {
  Python: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#FFD845" d="M49.33 62h29.15c8.06 0 14.54-6.69 14.54-14.88V18.15c0-7.92-6.67-13.85-14.54-15.27-5.08-.91-10.35-1.33-15.4-.88-5.05.45-9.55 1.68-13.26 3.58C42.83 9.12 39.47 16.58 39.47 24v9.75h30v3.75H32.09c-8.43 0-15.82 5.07-18.13 14.71-2.66 11.07-2.78 17.97 0 29.54 2.06 8.6 6.98 14.71 15.41 14.71h9.97V84.8c0-9.58 8.29-18.03 18-18.03zM46 25.16c-2.97 0-5.38-2.45-5.38-5.46 0-3.04 2.41-5.53 5.38-5.53 2.96 0 5.38 2.49 5.38 5.53 0 3.01-2.42 5.46-5.38 5.46z"/><path fill="#3776AB" d="M91.8 47.04c-8.43 0-13.36 5.07-13.36 14.71V72.2c0 9.77-6.5 18.57-18 18.57H49.33c-8.28 0-14.54 7.15-14.54 15.41v28.97c0 8.24 7.15 13.09 14.54 15.4 8.85 2.77 17.34 3.27 27.95 0 7.06-2.16 14.54-6.52 14.54-15.4V121H61.88v-3.75h27.95c8.43 0 11.56-5.88 14.54-14.71 3.07-9.09 2.94-17.84 0-29.71-2.12-8.54-6.11-14.71-14.54-14.71H78.54v11.67c0 10.85-8.19 18.24-18 18.24H49.33c-8.06 0-14.54 6.26-14.54 14.36v42.09c0 7.92 6.89 12.57 14.54 14.88 9.16 2.77 17.95 3.27 29.15 0 7.41-2.16 14.54-6.52 14.54-14.88V105c0-8.24-6.67-14.36-14.54-14.36H49.33c-8.06 0-18-6.84-18-14.88V47.04c0-8.24 6.67-15.41 18-15.41h29.15c8.43 0 14.54 7.15 14.54 15.41z"/></svg>
  ),
  Dart: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#01579B" d="M27.27 108.73L19.49 56.25l48.78-48.78 52.48 7.78L27.27 108.73z"/><path fill="#40C4FF" d="M100.75 108.73l19.99-52.48L68.27 3.77 19.49 52.55l7.78 56.18h73.48z"/><path fill="#29B6F6" d="M68.27 124.51l32.48-15.78L68.27 76.25V124.51z"/><path fill="#01579B" d="M27.27 108.73h73.48v15.78H27.27z" opacity=".2"/><path fill="#fff" d="M68.27 3.77v72.48l-48.78 32.48V52.55L68.27 3.77z" opacity=".2"/></svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#F0DB4F" d="M2 2h124v124H2z"/><path fill="#323330" d="M89.37 96.07c2.41 3.94 5.54 6.83 11.09 6.83 4.66 0 7.63-2.33 7.63-5.54 0-3.86-3.06-5.22-8.18-7.47l-2.81-1.2c-8.1-3.45-13.48-7.78-13.48-16.93 0-8.43 6.42-14.85 16.45-14.85 7.14 0 12.27 2.49 15.97 9l-8.74 5.61c-1.93-3.45-4-4.81-7.23-4.81-3.29 0-5.38 2.09-5.38 4.81 0 3.37 2.09 4.73 6.91 6.83l2.81 1.2c9.54 4.09 14.93 8.26 14.93 17.63 0 10.1-7.94 15.65-18.6 15.65-10.43 0-17.18-4.97-20.48-11.49l9.11-5.27zM52.02 97.27c1.77 3.13 3.37 5.78 7.23 5.78 3.69 0 6.02-1.45 6.02-7.06V57.91h11.25v38.32c0 11.65-6.83 16.93-16.77 16.93-8.99 0-14.21-4.65-16.85-10.25l9.12-5.64z"/></svg>
  ),
  HTML: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#E44D26" d="M19.04 113.3L9.7 8.04h108.58l-9.36 105.23L63.84 120z"/><path fill="#F16529" d="M64 112.99l36.09-10 8-89.36H64z"/><path fill="#EBEBEB" d="M64 51.83H45.16l-1.3-14.56H64V23.4H27.85l.34 3.82 3.5 39.27H64zm0 35.22l-.07.02-15.82-4.27-1.01-11.33H33.2l1.99 22.31L64 101.4v-14.35z"/><path fill="#fff" d="M63.95 51.83v13.87h17.49l-1.65 18.44-15.84 4.28v14.35l29.11-8.07.21-2.42 3.34-37.38.35-3.83h-3.78zm0-28.43v13.87h35.49l.29-3.27.67-7.42.34-3.82H63.95z"/></svg>
  ),
  CSS: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#1572B6" d="M19.04 113.3L9.7 8.04h108.58l-9.36 105.23L63.84 120z"/><path fill="#33A9DC" d="M64 112.99l36.09-10 8-89.36H64z"/><path fill="#fff" d="M64 51.83h17.49l1.21-13.56H64V24.4h33.69l-.32 3.56-3.26 36.53H64zm0 35.22l-.07.02-14.69-3.97-1.01-11.33H34.33l1.99 22.31L64 101.4z"/><path fill="#EBEBEB" d="M64 51.83v13.87H47.84l-1.38-15.53-.32-3.56H64V24.4H30.31l.32 3.56 3.26 36.53H64v-12.66zm0 35.22v14.35l-.07.02-14.69-3.97-1.01-11.33H34.33l1.99 22.31L64 101.4v-14.35z"/></svg>
  ),
  Flutter: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#42A5F5" d="M74.09 2L20.76 55.33l16.76 16.76L90.85 18.76zm0 52.66L53.43 75.33 70.19 92.09l37.05-37.05-16.38-16.38z"/><path fill="#0D47A1" d="M53.43 75.33L70.19 92.09 53.43 108.85 36.67 92.09z"/><path fill="#42A5F5" d="M53.43 108.85L70.19 125.61l37.05-37.05L90.85 72.18z"/></svg>
  ),
  Flask: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path d="M53.37 8.72v28.5l-29.5 58a14.75 14.75 0 0013.16 21.28h53.94a14.75 14.75 0 0013.16-21.28l-29.5-58V8.72m-3.69 0H75.63m-25.94 0h4.62m-4.62 4.62h25.94M49.69 41.84h28.62" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/></svg>
  ),
  Firebase: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#FFA000" d="M32.66 104.74l17.72-98.14a2.39 2.39 0 014.53-.49l18.6 34.75-8.77 16.8z"/><path fill="#F57C00" d="M94.28 104.74L80.6 22.65a2.39 2.39 0 00-4.12-1.12L32.66 104.74 60.6 120.7a7.17 7.17 0 006.81 0z"/><path fill="#FFCA28" d="M73.71 41.86l-8.78-16.8a2.39 2.39 0 00-4.24 0L32.66 104.74z"/><path fill="#fff" d="M60.6 120.7l33.68-15.96-5.35-33.46L60.6 120.7z" opacity="0.2"/></svg>
  ),
  Supabase: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#3FCF8E" d="M69.54 124.32c-2.68 3.38-8.12.76-7.95-3.82l2.27-61.42H106c6.22 0 9.66 7.16 5.73 11.94z"/><path fill="#3FCF8E" opacity="0.6" d="M58.46 3.68c2.68-3.38 8.12-.76 7.95 3.82l-.72 61.42H22c-6.22 0-9.66-7.16-5.73-11.94z"/></svg>
  ),
  Git: (
    <svg viewBox="0 0 128 128" className="w-10 h-10 drop-shadow-md"><path fill="#F34F29" d="M124.74 58.61L69.39 3.26a7.31 7.31 0 00-10.34 0l-11.48 11.48 14.54 14.54a8.69 8.69 0 0111 11.09l14.02 14.02a8.68 8.68 0 11-5.2 4.86L69.09 46.42v33.5a8.69 8.69 0 11-7.15.35V45.41a8.69 8.69 0 01-4.72-11.4L42.97 19.76 3.26 59.47a7.31 7.31 0 000 10.34l55.35 55.35a7.31 7.31 0 0010.34 0l55.79-55.79a7.31 7.31 0 000-10.34"/></svg>
  ),
  AI: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z"/><circle cx="12" cy="12" r="2"/></svg>
  ),
};

const premiumSkillGroups = [
  {
    name: 'Frontend',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-8',
    gradient: 'from-[#E44D26]/15 via-[#F0DB4F]/5 to-[#1572B6]/15',
    borderColor: 'group-hover:border-[#F0DB4F]/50',
    items: [
      { name: 'JavaScript', icon: techIcons.JavaScript },
      { name: 'HTML', icon: techIcons.HTML },
      { name: 'CSS', icon: techIcons.CSS },
    ]
  },
  {
    name: 'Backend',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-4',
    gradient: 'from-[#A0A0A0]/15 to-[#3776AB]/15',
    borderColor: 'group-hover:border-[#3776AB]/50',
    items: [
      { name: 'Python', icon: techIcons.Python },
      { name: 'Flask', icon: techIcons.Flask },
    ]
  },
  {
    name: 'Mobile',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-4',
    gradient: 'from-[#42A5F5]/15 to-[#01579B]/15',
    borderColor: 'group-hover:border-[#42A5F5]/50',
    items: [
      { name: 'Flutter', icon: techIcons.Flutter },
      { name: 'Dart', icon: techIcons.Dart },
    ]
  },
  {
    name: 'Database & Cloud',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-8',
    gradient: 'from-[#FFA000]/15 to-[#3FCF8E]/15',
    borderColor: 'group-hover:border-[#3FCF8E]/50',
    items: [
      { name: 'Firebase', icon: techIcons.Firebase },
      { name: 'Supabase', icon: techIcons.Supabase },
    ]
  },
  {
    name: 'Tools & AI',
    colSpan: 'col-span-1 md:col-span-3 lg:col-span-12',
    gradient: 'from-[#F4560E]/15 to-[#F34F29]/15',
    borderColor: 'group-hover:border-[#F4560E]/50',
    items: [
      { name: 'AI / LLM APIs', icon: techIcons.AI },
      { name: 'Git / GitHub', icon: techIcons.Git },
    ]
  }
];

const bentoVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// ─── 3D Hover Tilt Card Wrapper ──────────────────────────────────────
const TiltCard = ({ children, group, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth return-to-center and glide
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map position (-0.5 to 0.5) to a subtle rotation degree (±8deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Dynamic glare coordinates based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0]);
  
  // Creates a glass reflection that follows the cursor
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -0.5 to 0.5
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={bentoVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group rounded-3xl cursor-default overflow-visible ${className}`}
    >
      {/* 
        The physical card base layer 
        We use translateZ(0) so it doesn't pop, but serves as the anchor plane.
      */}
      <div 
        className={`absolute inset-0 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${group.borderColor} overflow-hidden`}
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Glow Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out`} />
        
        {/* Dynamic Glass Glare Overlay */}
        <motion.div
          className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBackground }}
        />
      </div>

      {/* 
        The floating content layer 
        We pop this forward by 40px on the Z-axis to create the Spline 3D parallax effect!
      */}
      <div 
        className="relative z-10 h-full p-8 flex flex-col justify-between"
        style={{ transform: "translateZ(40px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative z-10 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 mb-20 text-center"
        >
          <span className="text-accent text-meta font-medium tracking-widest uppercase">02 • Tech Stack</span>
          <h2 className="text-h2 md:text-display font-semibold tracking-tight text-[var(--color-ink)]">
            Premium Toolchain.
          </h2>
          <p className="text-[var(--color-muted)] text-lead max-w-2xl mx-auto">
            Hover over the cards below to experience the buttery smooth 3D Spline effect.
          </p>
        </motion.div>

        {/* 
          IMPORTANT: Perspective goes on the grid container.
          This enables true 3D rotation space for the child TiltCards.
        */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 auto-rows-[220px]"
          style={{ perspective: "1200px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {premiumSkillGroups.map((group, index) => (
            <TiltCard 
              key={group.name} 
              group={group}
              className={group.colSpan}
            >
              <h3 className="text-meta font-medium text-[var(--color-muted)] uppercase tracking-widest group-hover:text-[var(--color-ink)] transition-colors duration-300">
                {group.name}
              </h3>
              
              <div className="flex flex-wrap items-center gap-8 mt-auto">
                {group.items.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    variants={iconVariants}
                    className="flex flex-col items-center gap-3 relative"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ 
                        duration: 4 + (i % 2), 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                      className="p-3 bg-[var(--color-bg)] rounded-2xl border border-[var(--color-line)] group-hover:border-accent/40 transition-colors shadow-lg"
                    >
                      {item.icon}
                    </motion.div>
                    {/* Popped up label */}
                    <span 
                      className="text-[11px] font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-6 whitespace-nowrap"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
