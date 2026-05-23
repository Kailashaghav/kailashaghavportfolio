"use client";

import { motion } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACKS = [
  {
    category: "Frontend & 3D",
    icon: "◈",
    color: "#ff4d1c",
    skills: [
      { name: "React JS / Next JS", level: 90 },
      { name: "Three.js / R3F",     level: 85 },
      { name: "TypeScript",          level: 82 },
      { name: "Tailwind CSS",        level: 92 },
    ],
  },
  {
    category: "Data Science & ML",
    icon: "◉",
    color: "#00ffd1",
    skills: [
      { name: "Python / Pandas",     level: 88 },
      { name: "Scikit-learn / NLP",  level: 84 },
      { name: "Power BI / Excel",    level: 80 },
      { name: "NumPy / Matplotlib",  level: 86 },
    ],
  },
  {
    category: "Backend & Cloud",
    icon: "◆",
    color: "#7c3aed",
    skills: [
      { name: "Node JS / Express JS", level: 82 },
      { name: "MySQL / MongoDB",       level: 80 },
      { name: "AWS EC2 / S3",          level: 72 },
      { name: "Docker / CI/CD",        level: 74 },
    ],
  },
];

const TOOL_TAGS = [
  "JavaScript", "Java", "C++", "Python", "HTML", "CSS",
  "React JS", "Next JS", "Node JS", "Express JS", "EJS",
  "Three.js", "R3F", "Zustand", "Axios",
  "Tailwind", "Bootstrap", "WordPress",
  "MySQL", "MongoDB", "SQL", "NoSQL",
  "Hadoop", "Apache PIG", "Sqoop", "Apache Hive",
  "Git", "GitHub", "Docker", "Linux",
  "Figma", "Photoshop", "Power BI",
  "AWS EC2", "S3", "IAM",
  "GSAP", "Framer Motion", "Agile / Scrum",
];

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs tracking-widest text-ghost/80 uppercase">{name}</span>
        <span className="font-mono text-xs tracking-widest" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-px bg-white/5 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full skill-bar-fill"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref: parallax1 } = useParallax<HTMLDivElement>({ speed: -4 });
  const { ref: parallax2 } = useParallax<HTMLDivElement>({ speed: 4 });

  useGSAP(() => {
    gsap.fromTo(
      ".stack-card",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#skills", start: "top 70%" },
      }
    );
    gsap.fromTo(
      ".tool-tag",
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".tool-tags-grid", start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="skills" className="relative section-pad overflow-hidden bg-void">
      {/* BG glow blob */}
      <div
        ref={parallax2 as any}
        className="absolute top-1/2 right-0 w-[650px] h-[650px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff4d1c 0%, transparent 70%)", transform: "translate(30%, -50%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">02 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Skills & Tools</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Headline */}
        <div ref={parallax1 as any} className="mb-16">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost">
            CRAFT &amp;<br />
            <span className="text-ember">EXPERTISE</span>
          </h2>
        </div>

        {/* Skill stacks */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {TECH_STACKS.map((stack, si) => (
            <div
              key={stack.category}
              className="stack-card p-8 border border-white/5 bg-obsidian/50 backdrop-blur-sm hover:border-white/10 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl" style={{ color: stack.color }}>{stack.icon}</span>
                <span className="font-mono text-xs tracking-widest uppercase text-ghost/60">
                  {stack.category}
                </span>
              </div>
              {stack.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={stack.color}
                  delay={0.1 * i + 0.3 * si}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tool tags */}
        <div className="border-t border-white/5 pt-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
            Full Technology Stack
          </p>
          <div className="tool-tags-grid flex flex-wrap gap-3">
            {TOOL_TAGS.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, borderColor: "#ff4d1c", color: "#ff4d1c" }}
                className="tool-tag px-4 py-2 border border-white/10 font-mono text-xs text-muted tracking-widest uppercase cursor-default transition-colors"
                style={{ opacity: 0 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
