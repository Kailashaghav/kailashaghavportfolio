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
    id: "p0",
    num: "000",
    title: "RESEARCHFORGE AI",
    subtitle: "Multi-Agent AI · LangGraph · Groq LLM · Agentic Pipeline",
    tags: ["Python", "LangGraph", "Groq LLM", "Tavily", "Streamlit", "LangChain", "BeautifulSoup"],
    year: "2025",
    color: "#818cf8",
    description: "Production-ready Multi-Agent Research Pipeline with 4 specialized AI agents — Search, Reader, Writer, Critic — working in sequence to produce publication-ready reports. Built with LangGraph, Groq LLM and Tavily web search with a deep-space 3D glassmorphic Streamlit UI.",
    link: "https://researchforge-ai-vznhiyfu45vgpu8fguaa68.streamlit.app/",
    github: "https://github.com/Kailashaghav/researchforge-ai",
  },
  {
    id: "p1",
    num: "001",
    title: "SENTIMENTLENS PRO",
    subtitle: "AI · NLP · Real-Time Sentiment Analysis · Full-Stack",
    tags: ["Python", "FastAPI", "Scikit-learn", "NLP", "Chart.js", "JavaScript", "Speech API"],
    year: "2025",
    color: "#ff4d1c",
    description: "Full-stack AI dashboard performing real-time sentiment analysis with 92% accuracy. Users input text manually or via voice using the Speech Recognition API. Features interactive Chart.js visualisations, geolocation tracking, and a FastAPI backend with Scikit-learn NLP pipeline under 200ms response time.",
    link: "https://sentiment-frontend-ashen-three.vercel.app/",
    github: "https://github.com/Kailashaghav",
  },
  {
    id: "p2",
    num: "002",
    title: "SMART AGRICULTURE APP",
    subtitle: "AI · CNN · TensorFlow · Mobile · Multi-Language",
    tags: ["Python", "Kivy", "TensorFlow", "CNN", "OpenWeatherMap", "pyttsx3", "MobileNetV2"],
    year: "2024",
    color: "#4ade80",
    description: "Mobile app using CNN with MobileNetV2 transfer learning to detect 38+ plant diseases at 95% accuracy. Integrates real-time weather insights, ML-based crop recommendations across 15 soil-season combinations, 8 government scheme guides, and multi-language TTS in English, Hindi, and Marathi.",
    link: "https://github.com/Kailashaghav",
    github: "https://github.com/Kailashaghav",
  },
  {
    id: "p3",
    num: "003",
    title: "CUSTOMER ANALYTICS",
    subtitle: "Data Analysis · Power BI · Business Intelligence",
    tags: ["Python", "SQL", "Power BI", "EDA", "Pandas", "RFM Analysis", "Data Cleaning"],
    year: "2024",
    color: "#00ffd1",
    description: "End-to-end analytics pipeline processing 500K+ customer transaction records. Built 5+ interactive Power BI dashboards for KPI monitoring, RFM segmentation, and revenue forecasting. Identified top 20% customers driving 80% of revenue via Pareto analysis, reducing data prep time by 35%.",
    link: "https://github.com/Kailashaghav/customer_behavior_analysis.git",
    github: "https://github.com/Kailashaghav/customer_behavior_analysis.git",
  },
  {
    id: "p4",
    num: "004",
    title: "FACE RECOGNITION ATTENDANCE",
    subtitle: "Computer Vision · Machine Learning · Automation",
    tags: ["Python", "OpenCV", "Scikit-learn", "KNN", "Streamlit", "Pandas", "pyttsx3"],
    year: "2024",
    color: "#a78bfa",
    description: "Real-time AI-powered attendance system using KNN classifier and Haar Cascade face detection. Automatically marks attendance with timestamps, prevents duplicate entries, includes voice feedback, and provides a live Streamlit dashboard for monitoring records.",
    link: "https://github.com/Kailashaghav",
    github: "https://github.com/Kailashaghav",
  },
  {
    id: "p5",
    num: "005",
    title: "SHOW EV DASHBOARD",
    subtitle: "Data Analytics · Tableau · Business Intelligence",
    tags: ["Tableau", "Python", "Pandas", "CSV", "Data Visualisation", "KPI", "Kaggle"],
    year: "2024",
    color: "#38bdf8",
    description: "Interactive Tableau dashboard analysing 150K+ Electric Vehicle records across the US. Tracks EV adoption trends by model year, state-wise distribution, top manufacturers, BEV vs PHEV market share, and CAFV eligibility using area charts, map visuals, treemaps, and donut charts.",
    link: "https://github.com/Kailashaghav",
    github: "https://github.com/Kailashaghav",
  },
  {
    id: "p6",
    num: "006",
    title: "MOVIE RECOMMENDER",
    subtitle: "Machine Learning · NLP · Content-Based Filtering",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit", "TMDB API", "NLP"],
    year: "2024",
    color: "#f472b6",
    description: "Content-based movie recommendation engine using NLP and cosine similarity. CountVectorizer for text vectorisation across genres, keywords, cast and overview. Built interactive Streamlit UI with real-time TMDB poster fetch and Pickle-based model serialisation for fast deployment.",
    link: "https://github.com/Kailashaghav/MOVIE-RECOMMENDATION-SYSTEM.git",
    github: "https://github.com/Kailashaghav/MOVIE-RECOMMENDATION-SYSTEM.git",
  },
];
function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
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
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)` }}
      />
      <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(20px)" }}>
        <div>
          <span className="font-mono text-xs tracking-widest text-muted">{project.year}</span>
          <h3 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none tracking-wide mt-1" style={{ color: hovered ? project.color : "#e8e8f0", transition: "color 0.3s" }}>
            {project.title}
          </h3>
          <p className="font-mono text-xs text-muted tracking-widest mt-2">{project.subtitle}</p>
        </div>
        <span className="font-display text-5xl text-white/5">{project.num}</span>
      </div>
      <p className="font-body text-muted text-sm leading-relaxed mb-6" style={{ transform: "translateZ(10px)" }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-8" style={{ transform: "translateZ(15px)" }}>
        {project.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 font-mono text-xs tracking-widest border uppercase" style={{ borderColor: `${project.color}30`, color: project.color }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4" style={{ transform: "translateZ(20px)" }}>
        <motion.a href={project.github} target="_blank" rel="noreferrer" whileHover={{ x: 4 }} className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase group" style={{ color: project.color }}>
          <span>GitHub</span>
          <span className="w-4 h-px group-hover:w-8 transition-all duration-300" style={{ background: project.color }} />
          <span>↗</span>
        </motion.a>
        {(project.id === "p0" || project.id === "p1") && (
          <motion.a href={project.link} target="_blank" rel="noreferrer" whileHover={{ x: 4 }} className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase group" style={{ color: project.color }}>
            <span>Live Demo</span>
            <span className="w-4 h-px group-hover:w-8 transition-all duration-300" style={{ background: project.color }} />
            <span>↗</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
export default function ProjectsSection() {
  const { ref: parallax } = useParallax<HTMLDivElement>({ speed: -5 });
  useGSAP(() => {
    gsap.fromTo(".project-card", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: "#projects", start: "top 70%" } });
  }, []);
  return (
    <section id="projects" className="relative section-pad overflow-hidden bg-obsidian">
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aurora/25 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-ember tracking-widest">03 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Projects</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>
        <div className="grid md:grid-cols-5 gap-16 mb-20">
          <div ref={parallax as any} className="md:col-span-2 flex flex-col justify-start">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-none text-ghost sticky top-50">
              SELECTED<br /><span className="text-ember">WORK</span>
            </h2>
            <p className="font-body text-muted mt-6 leading-relaxed text-sm max-w-xs">End-to-end projects combining data intelligence with modern engineering.</p>
            <motion.a href="https://github.com/Kailashaghav" target="_blank" rel="noreferrer" whileHover={{ x: 4 }} className="inline-flex items-center gap-3 mt-8 font-mono text-xs text-ember tracking-widest uppercase group">
              <span>All Repos</span>
              <span className="w-8 h-px bg-ember group-hover:w-16 transition-all duration-300" />
              <span>↗</span>
            </motion.a>
          </div>
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
