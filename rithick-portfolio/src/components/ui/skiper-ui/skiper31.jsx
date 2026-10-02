import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "../../../lib/utils";

// ─── Inline SVG Tech Icons (no external deps) ──────────────────────────
const techIcons = {
  Python: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#FFD845" d="M49.33 62h29.15c8.06 0 14.54-6.69 14.54-14.88V18.15c0-7.92-6.67-13.85-14.54-15.27-5.08-.91-10.35-1.33-15.4-.88-5.05.45-9.55 1.68-13.26 3.58C42.83 9.12 39.47 16.58 39.47 24v9.75h30v3.75H32.09c-8.43 0-15.82 5.07-18.13 14.71-2.66 11.07-2.78 17.97 0 29.54 2.06 8.6 6.98 14.71 15.41 14.71h9.97V84.8c0-9.58 8.29-18.03 18-18.03zM46 25.16c-2.97 0-5.38-2.45-5.38-5.46 0-3.04 2.41-5.53 5.38-5.53 2.96 0 5.38 2.49 5.38 5.53 0 3.01-2.42 5.46-5.38 5.46z"/><path fill="#3776AB" d="M91.8 47.04c-8.43 0-13.36 5.07-13.36 14.71V72.2c0 9.77-6.5 18.57-18 18.57H49.33c-8.28 0-14.54 7.15-14.54 15.41v28.97c0 8.24 7.15 13.09 14.54 15.4 8.85 2.77 17.34 3.27 27.95 0 7.06-2.16 14.54-6.52 14.54-15.4V121H61.88v-3.75h27.95c8.43 0 11.56-5.88 14.54-14.71 3.07-9.09 2.94-17.84 0-29.71-2.12-8.54-6.11-14.71-14.54-14.71H78.54v11.67c0 10.85-8.19 18.24-18 18.24H49.33c-8.06 0-14.54 6.26-14.54 14.36v42.09c0 7.92 6.89 12.57 14.54 14.88 9.16 2.77 17.95 3.27 29.15 0 7.41-2.16 14.54-6.52 14.54-14.88V105c0-8.24-6.67-14.36-14.54-14.36H49.33c-8.06 0-18-6.84-18-14.88V47.04c0-8.24 6.67-15.41 18-15.41h29.15c8.43 0 14.54 7.15 14.54 15.41z"/></svg>
  ),
  Dart: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#01579B" d="M27.27 108.73L19.49 56.25l48.78-48.78 52.48 7.78L27.27 108.73z"/><path fill="#40C4FF" d="M100.75 108.73l19.99-52.48L68.27 3.77 19.49 52.55l7.78 56.18h73.48z"/><path fill="#29B6F6" d="M68.27 124.51l32.48-15.78L68.27 76.25V124.51z"/><path fill="#01579B" d="M27.27 108.73h73.48v15.78H27.27z" opacity=".2"/><path fill="#fff" d="M68.27 3.77v72.48l-48.78 32.48V52.55L68.27 3.77z" opacity=".2"/></svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#F0DB4F" d="M2 2h124v124H2z"/><path fill="#323330" d="M89.37 96.07c2.41 3.94 5.54 6.83 11.09 6.83 4.66 0 7.63-2.33 7.63-5.54 0-3.86-3.06-5.22-8.18-7.47l-2.81-1.2c-8.1-3.45-13.48-7.78-13.48-16.93 0-8.43 6.42-14.85 16.45-14.85 7.14 0 12.27 2.49 15.97 9l-8.74 5.61c-1.93-3.45-4-4.81-7.23-4.81-3.29 0-5.38 2.09-5.38 4.81 0 3.37 2.09 4.73 6.91 6.83l2.81 1.2c9.54 4.09 14.93 8.26 14.93 17.63 0 10.1-7.94 15.65-18.6 15.65-10.43 0-17.18-4.97-20.48-11.49l9.11-5.27zM52.02 97.27c1.77 3.13 3.37 5.78 7.23 5.78 3.69 0 6.02-1.45 6.02-7.06V57.91h11.25v38.32c0 11.65-6.83 16.93-16.77 16.93-8.99 0-14.21-4.65-16.85-10.25l9.12-5.64z"/></svg>
  ),
  HTML: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#E44D26" d="M19.04 113.3L9.7 8.04h108.58l-9.36 105.23L63.84 120z"/><path fill="#F16529" d="M64 112.99l36.09-10 8-89.36H64z"/><path fill="#EBEBEB" d="M64 51.83H45.16l-1.3-14.56H64V23.4H27.85l.34 3.82 3.5 39.27H64zm0 35.22l-.07.02-15.82-4.27-1.01-11.33H33.2l1.99 22.31L64 101.4v-14.35z"/><path fill="#fff" d="M63.95 51.83v13.87h17.49l-1.65 18.44-15.84 4.28v14.35l29.11-8.07.21-2.42 3.34-37.38.35-3.83h-3.78zm0-28.43v13.87h35.49l.29-3.27.67-7.42.34-3.82H63.95z"/></svg>
  ),
  CSS: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#1572B6" d="M19.04 113.3L9.7 8.04h108.58l-9.36 105.23L63.84 120z"/><path fill="#33A9DC" d="M64 112.99l36.09-10 8-89.36H64z"/><path fill="#fff" d="M64 51.83h17.49l1.21-13.56H64V24.4h33.69l-.32 3.56-3.26 36.53H64zm0 35.22l-.07.02-14.69-3.97-1.01-11.33H34.33l1.99 22.31L64 101.4z"/><path fill="#EBEBEB" d="M64 51.83v13.87H47.84l-1.38-15.53-.32-3.56H64V24.4H30.31l.32 3.56 3.26 36.53H64v-12.66zm0 35.22v14.35l-.07.02-14.69-3.97-1.01-11.33H34.33l1.99 22.31L64 101.4v-14.35z"/></svg>
  ),
  Flutter: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#42A5F5" d="M74.09 2L20.76 55.33l16.76 16.76L90.85 18.76zm0 52.66L53.43 75.33 70.19 92.09l37.05-37.05-16.38-16.38z"/><path fill="#0D47A1" d="M53.43 75.33L70.19 92.09 53.43 108.85 36.67 92.09z"/><path fill="#42A5F5" d="M53.43 108.85L70.19 125.61l37.05-37.05L90.85 72.18z"/></svg>
  ),
  Flask: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path d="M53.37 8.72v28.5l-29.5 58a14.75 14.75 0 0013.16 21.28h53.94a14.75 14.75 0 0013.16-21.28l-29.5-58V8.72m-3.69 0H75.63m-25.94 0h4.62m-4.62 4.62h25.94M49.69 41.84h28.62" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/></svg>
  ),
  Firebase: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#FFA000" d="M32.66 104.74l17.72-98.14a2.39 2.39 0 014.53-.49l18.6 34.75-8.77 16.8z"/><path fill="#F57C00" d="M94.28 104.74L80.6 22.65a2.39 2.39 0 00-4.12-1.12L32.66 104.74 60.6 120.7a7.17 7.17 0 006.81 0z"/><path fill="#FFCA28" d="M73.71 41.86l-8.78-16.8a2.39 2.39 0 00-4.24 0L32.66 104.74z"/><path fill="#fff" d="M60.6 120.7l33.68-15.96-5.35-33.46L60.6 120.7z" opacity="0.2"/></svg>
  ),
  Supabase: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#3FCF8E" d="M69.54 124.32c-2.68 3.38-8.12.76-7.95-3.82l2.27-61.42H106c6.22 0 9.66 7.16 5.73 11.94z"/><path fill="#3FCF8E" opacity="0.6" d="M58.46 3.68c2.68-3.38 8.12-.76 7.95 3.82l-.72 61.42H22c-6.22 0-9.66-7.16-5.73-11.94z"/></svg>
  ),
  Git: (
    <svg viewBox="0 0 128 128" className="w-8 h-8"><path fill="#F34F29" d="M124.74 58.61L69.39 3.26a7.31 7.31 0 00-10.34 0l-11.48 11.48 14.54 14.54a8.69 8.69 0 0111 11.09l14.02 14.02a8.68 8.68 0 11-5.2 4.86L69.09 46.42v33.5a8.69 8.69 0 11-7.15.35V45.41a8.69 8.69 0 01-4.72-11.4L42.97 19.76 3.26 59.47a7.31 7.31 0 000 10.34l55.35 55.35a7.31 7.31 0 0010.34 0l55.79-55.79a7.31 7.31 0 000-10.34"/></svg>
  ),
  AI: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z"/><circle cx="12" cy="12" r="2"/></svg>
  ),
};

const techStack = [
  { name: "Python",     icon: techIcons.Python,     color: "#3776AB" },
  { name: "Dart",       icon: techIcons.Dart,        color: "#01579B" },
  { name: "JavaScript", icon: techIcons.JavaScript,  color: "#F0DB4F" },
  { name: "HTML",       icon: techIcons.HTML,        color: "#E44D26" },
  { name: "CSS",        icon: techIcons.CSS,         color: "#1572B6" },
  { name: "Flutter",    icon: techIcons.Flutter,     color: "#42A5F5" },
  { name: "Flask",      icon: techIcons.Flask,       color: "#A0A0A0" },
  { name: "Firebase",   icon: techIcons.Firebase,    color: "#FFA000" },
  { name: "Supabase",   icon: techIcons.Supabase,    color: "#3FCF8E" },
  { name: "Git",        icon: techIcons.Git,         color: "#F34F29" },
  { name: "AI / LLMs",  icon: techIcons.AI,          color: "#F4560E" },
];

const IconCard = ({ item, index, centerIndex, scrollYProgress }) => {
  const distanceFromCenter = index - centerIndex;
  
  // Scatter from a wider arc and settle into 0
  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 80, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [Math.abs(distanceFromCenter) * 60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.5, 1]);

  return (
    <motion.div style={{ x, y, scale, opacity }}>
      <div className="inline-flex flex-col items-center justify-center gap-2 w-24 h-28 md:w-28 md:h-32 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg hover:shadow-[0_10px_30px_rgba(244,86,14,0.15)] transition-all duration-300 group cursor-default relative overflow-hidden hover:border-[var(--color-accent)] hover:-translate-y-2 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
          {item.icon}
        </div>
        <span className="text-[11px] md:text-sm font-medium text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-colors tracking-wide relative z-10">
          {item.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skiper31 = () => {
  const containerRef = useRef(null);
  
  // Track scroll over this specific section. 
  // Offset: When the top of the container hits the bottom of the viewport ("start end"),
  // until the center of the container hits the center of the viewport ("center center").
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const iconCenterIndex = Math.floor(techStack.length / 2);

  return (
    <main ref={containerRef} className="w-full bg-transparent py-32 relative z-20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl flex flex-col items-center gap-16">
        
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <span className="text-accent text-meta font-medium tracking-widest uppercase">Toolchain</span>
          <p className="flex items-center justify-center gap-3 text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[var(--color-ink)]">
            <Bracket className="h-10 md:h-14 text-[var(--color-muted)]" />
            <span>Integrate with your fav tech stack</span>
            <Bracket className="h-10 md:h-14 scale-x-[-1] text-[var(--color-muted)]" />
          </p>
        </motion.div>

        {/* Scattered Grid */}
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap px-2">
          {techStack.map((item, index) => (
            <IconCard 
              key={index} 
              item={item} 
              index={index} 
              centerIndex={iconCenterIndex} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export { Skiper31 };

const Bracket = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      ></path>
    </svg>
  );
};
