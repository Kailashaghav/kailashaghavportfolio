"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParallax } from "react-scroll-parallax";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: Project[] = [
  {
    id: "p1",
    num: "001",
    title: "MOVIE RECOMMENDER",
    subtitle: "Machine Learning · NLP · Content-Based Filtering",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit", "TMDB API", "NLP", "Pickle"],
    year: "2024",
    color: "#ff4d1c",
    description:
      "Content-based movie recommendation engine using NLP and cosine similarity. CountVectorizer for text vectorisation across genres, keywords, cast and overview. Built interactive Streamlit UI with real-time TMDB poster fetch and Pickle-based model serialisation for fast deployment.",
    link: "https://github.com/Kailashaghav/MOVIE-RECOMMENDATION-SYSTEM.git",
    github: "https://github.com/Kailashaghav/MOVIE-RECOMMENDATION-SYSTEM.git",
  },
  {
    id: "p2",
    num: "002",
    title: "CUSTOMER ANALYTICS",
    subtitle: "Data Analysis · Power BI · Business Intelligence",
    tags: ["Python", "SQL", "Power BI", "EDA", "Pandas", "Data Cleaning", "Visualisation"],
    year: "2024",
    color: "#00ffd1",
    description:
      "End-to-end analytics pipeline processing large-scale customer transaction records. Reduced data inconsistencies through cleaning, built Power BI dashboards tracking sales trends, customer segments and KPIs, and identified the top 20% customers driving majority revenue via Pareto analysis.",
    link: "https://github.com/Kailashaghav/customer_behavior_analysis.git",
    github: "https://github.com/Kailashaghav/customer_behavior_analysis.git",
  },
];

function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX  = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY  = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5));
    y.set(((e.clientY - rect.top)  / rect.height - 0.5));
  };

  return (
    <motion.div
      ref={cardRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="project-card relative p-8 border border-white/5 bg-obsidian/40 backdrop-blur-sm hover:border-white/10 transition-all duration-500 cursor-default"
    >
      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none rounded-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)`,
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(20px)" }}>
        <div>
          <span className="font-mono text-xs tracking-widest text-muted">{project.year}</span>
          <h3
            className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none tracking-wide mt-1"
            style={{ color: hovered ? project.color : "#e8e8f0", transition: "color 0.3s" }}
          >
            {project.title}
          </h3>
          <p className="font-mono text-xs text-muted tracking-widest mt-2">{project.subtitle}</p>
        </div>
        <span className="font-display text-5xl text-white/5">{project.num}</span>
      </div>

      {/* Description */}
      <p className="font-body text-muted text-sm leading-relaxed mb-6" style={{ transform: "translateZ(10px)" }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8" style={{ transform: "translateZ(15px)" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 font-mono text-xs tracking-widest border uppercase"
            style={{ borderColor: `${project.color}30`, color: project.color }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4" style={{ transform: "translateZ(20px)" }}>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase group"
          style={{ color: project.color }}
        >
          <span>GitHub</span>
          <span className="w-4 h-px group-hover:w-8 transition-all duration-300" style={{ background: project.color }} />
          <span>↗</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { ref: parallax } = useParallax<HTMLDivElement>({ speed: -5 });

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: "#projects", start: "top 70%" },
      }
    );
  }, []);

  return (
    <section id="projects" className="relative section-pad overflow-hidden bg-obsidian">
      {/* Accent */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aurora/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">03 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Projects</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-16 mb-20">
          {/* Headline */}
          <div ref={parallax as any} className="md:col-span-2 flex flex-col justify-start">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-none text-ghost sticky top-32">
              SELECTED<br />
              <span className="text-ember">WORK</span>
            </h2>
            <p className="font-body text-muted mt-6 leading-relaxed text-sm max-w-xs">
              End-to-end projects combining data intelligence with modern engineering.
            </p>
            <motion.a
              href="https://github.com/Kailashaghav"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-3 mt-8 font-mono text-xs text-ember tracking-widest uppercase group"
            >
              <span>All Repos</span>
              <span className="w-8 h-px bg-ember group-hover:w-16 transition-all duration-300" />
              <span>↗</span>
            </motion.a>
          </div>

          {/* Cards */}
          <div className="md:col-span-3 flex flex-col gap-8">
            {PROJECTS.map((project) => (
              <TiltCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
