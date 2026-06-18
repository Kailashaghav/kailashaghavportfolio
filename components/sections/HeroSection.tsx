"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import gsap from "gsap";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), { ssr: false });

const ROLES = [
  "Data Scientist",
  "ML Engineer",
  "Full-Stack Dev",
  "Three.js Builder",
  "AR / VR Explorer",
];

function useTextScramble(selector: string) {
  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) return;
    const original = el.innerText;
    let frame = 0;
    let frameReq: number;
    function update() {
      let output = "";
      for (let i = 0; i < original.length; i++) {
        output += frame > i * 2 ? original[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      el.innerText = output;
      if (frame < original.length * 2) { frame++; frameReq = requestAnimationFrame(update); }
    }
    const t = setTimeout(update, 700);
    return () => { clearTimeout(t); cancelAnimationFrame(frameReq); };
  }, [selector]);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yBg    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const { ref: parallaxRef } = useParallax<HTMLDivElement>({ speed: -10 });

  useTextScramble("#hero-name");

  useEffect(() => {
    gsap.fromTo(
      ".hero-line",
      { y: 130, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, stagger: 0.15, ease: "power4.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".hero-meta",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, delay: 1.1, ease: "power2.out" }
    );

    const roles = document.querySelectorAll(".role-item");
    if (roles.length) {
      let current = 0;
      const cycle = () => {
        gsap.to(roles[current], { opacity: 0, y: -22, duration: 0.4, ease: "power2.in" });
        current = (current + 1) % roles.length;
        gsap.fromTo(roles[current], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.4 });
      };
      const interval = setInterval(cycle, 2600);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section
      ref={sectionRef as any}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* 3D canvas */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <HeroCanvas />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 z-1 bg-grid-bg bg-grid opacity-30 pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 z-1 bg-gradient-radial from-transparent via-void/40 to-void pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void to-transparent z-1 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24"
      >
        <div ref={parallaxRef as any} className="max-w-5xl">
          {/* Badge */}
          <div className="hero-meta flex items-center gap-3 mb-8 opacity-0">
            <span className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-aurora animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-aurora uppercase">
                Available for Opportunities
              </span>
            </span>
            <span className="text-muted">—</span>
            <span className="font-mono text-xs tracking-widest text-muted">2027</span>
          </div>

          {/* Name */}
          <div className="overflow-hidden mb-1">
            <h1 className="hero-line opacity-0 font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-ghost">
              KAILASH
            </h1>
          </div>
          <div className="overflow-hidden mb-5">
            <h1
              id="hero-name"
              className="hero-line opacity-0 font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-ember glow-ember"
            >
              AGHAV
            </h1>
          </div>

          {/* Role switcher */}
          <div className="overflow-hidden h-10 relative mb-8">
            {ROLES.map((role, i) => (
              <div
                key={role}
                className={`role-item absolute font-mono text-sm tracking-widest text-ghost/65 uppercase ${
                  i === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                — {role}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="overflow-hidden max-w-xl">
            <p className="hero-meta opacity-0 font-body text-muted text-lg leading-relaxed">
              Building intelligent systems at the intersection of{" "}
              <span className="text-ghost">Data Science</span>,{" "}
              <span className="text-ghost">Machine Learning</span> and{" "}
              <span className="text-ghost">Full-Stack Development</span>.
              Turning raw data into extraordinary experiences.
            </p>
          </div>

          {/* CTA */}
          <div className="hero-meta opacity-0 flex flex-wrap gap-4 mt-10">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-ember text-void font-mono text-sm tracking-widest uppercase overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <span className="absolute inset-0 bg-ghost translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-ghost/20 text-ghost font-mono text-sm tracking-widest uppercase hover:border-ember hover:text-ember transition-colors duration-300"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="https://github.com/Kailashaghav"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-aurora/25 text-aurora font-mono text-sm tracking-widest uppercase hover:border-aurora hover:bg-aurora/10 transition-colors duration-300"
            >
              GitHub ↗
            </motion.a>
          </div>

          {/* Stats */}
          <div className="hero-meta opacity-0 flex gap-12 mt-16 border-t border-white/5 pt-8">
            {[
              { num: "8.0", label: "CGPA" },
              
              
              { num: "2027", label: "Graduating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl text-ember">{stat.num}</div>
                <div className="font-mono text-xs text-muted tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 right-12 flex flex-col items-center gap-3 z-10"
      >
        <span className="font-mono text-xs text-muted tracking-widest rotate-90 origin-center mb-4">Scroll</span>
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-ember to-transparent"
        />
      </motion.div>
    </section>
  );
}
