"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { site } from "../../../data/site";
import { cn } from "../../../lib/utils";

// ── Buttery-smooth TextRoll ─────────────────────────────────────────
// Each word is self-contained: its own overflow-hidden box with two
// copies stacked. On hover the top copy slides up, bottom slides in.
// Works perfectly on multi-line wrapped text because every word is
// an independent inline-block — line breaks happen naturally.

const WORD_STAGGER = 0.03;

const TextRoll = ({ children, className, center = false }) => {
  const words = children.split(" ");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("inline cursor-pointer", className)}
    >
      {words.map((word, i) => {
        const delay = center
          ? WORD_STAGGER * Math.abs(i - (words.length - 1) / 2)
          : WORD_STAGGER * i;

        return (
          <React.Fragment key={i}>
            <span
              className="relative inline-block overflow-hidden align-top"
              style={{ lineHeight: 1 }}
            >
              {/* Original text — slides up */}
              <motion.span
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-100%" },
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay,
                }}
                className="inline-block will-change-transform"
                style={{ transform: "translateZ(0)" }}
              >
                {word}
              </motion.span>

              {/* Duplicate text — slides in from below */}
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 },
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay,
                }}
                className="absolute left-0 top-0 inline-block will-change-transform"
                style={{ transform: "translateZ(0)" }}
                aria-hidden="true"
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </motion.span>
  );
};

// ── Main component ──────────────────────────────────────────────────

const Skiper28 = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Spring-smoothed scroll → silky 60fps parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const yMotionValue = useTransform(smoothProgress, [0, 1], [200, -100]);
  const transform = useMotionTemplate`rotateX(30deg) translateY(${yMotionValue}px) translateZ(10px)`;

  const leadText =
    site.lead !== "[TO BE PROVIDED]"
      ? site.lead
      : "I craft digital experiences with a focus on clean design, performance, and user-centric architecture. Building the future of the web, one line of code at a time.";

  return (
    <div
      ref={targetRef}
      className="relative z-10 h-[120vh] w-full bg-transparent text-ink overflow-hidden border-t border-[var(--color-line)]"
    >
      <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[var(--color-ink)] after:to-transparent after:content-['']">
          Scroll down to see
        </span>
      </div>
      <div
        className="sticky top-[20vh] mx-auto flex items-center justify-center bg-transparent py-20 w-full overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          perspective: "800px",
        }}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            transform,
            willChange: "transform",
          }}
          className="w-full max-w-5xl text-center text-4xl md:text-6xl font-bold tracking-tighter text-accent leading-tight px-4"
        >
          <TextRoll center className="leading-tight">
            {leadText}
          </TextRoll>
          <div className="absolute bottom-0 left-0 h-[60vh] w-full bg-gradient-to-b from-transparent to-bg pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export { Skiper28, TextRoll };
