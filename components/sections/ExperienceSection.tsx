"use client";

import { motion } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: "Freelance Data Analyst",
    company: "Self-Employed · Remote",
    period: "2023 — Present",
    type: "Freelance",
    highlights: [
      "Completed multiple end-to-end analytics projects using Python, SQL, and Power BI",
      "Developed dashboards and reports to analyse customer behaviour and sales trends",
      "Applied data cleaning, EDA, and visualisation to generate actionable business insights",
      "Built predictive models and performed data-driven analysis for client decision-making",
    ],
    color: "#ff4d1c",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech — Data Science",
    institution: "CHH. Nagar, India",
    period: "2023 — 2027",
    detail: "CGPA: 8.0  ·  Minor: Augmented & Virtual Reality",
    color: "#00ffd1",
  },
  {
    degree: "Minor Degree",
    institution: "AR & VR Specialisation",
    period: "Ongoing",
    detail: "Focus: Immersive computing, spatial interfaces, and real-time 3D",
    color: "#7c3aed",
  },
  {
    degree: "10th SSC — 87.80%",
    institution: "Sant Dnyaneshwar Vidyalaya, Parbhani",
    period: "2022",
    detail: "Strong foundation in Mathematics and Computer Science",
    color: "#ff4d1c",
  },
];

export default function ExperienceSection() {
  const { ref: parallax } = useParallax<HTMLDivElement>({ speed: -5 });

  useGSAP(() => {
    gsap.fromTo(
      ".exp-item",
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#experience", start: "top 70%" },
      }
    );
    gsap.fromTo(
      ".edu-item",
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: "#experience", start: "top 60%" },
      }
    );
    gsap.fromTo(
      ".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.6, ease: "power2.inOut",
        scrollTrigger: { trigger: "#experience", start: "top 70%" },
      }
    );
  }, []);

  return (
    <section id="experience" className="relative section-pad overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">04 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Experience &amp; Education
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-16">
          {/* Headline */}
          <div ref={parallax as any} className="md:col-span-2">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-ghost sticky top-32">
              CAREER<br />
              <span className="text-ember">JOURNEY</span>
            </h2>
            <p className="font-body text-muted mt-6 leading-relaxed text-sm">
              Building expertise across data science, full-stack engineering,
              and immersive technologies — one project at a time.
            </p>
          </div>

          {/* Timeline */}
          <div className="md:col-span-3 relative">
            <div
              className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-ember via-aurora to-plasma origin-top"
              style={{ transformOrigin: "top" }}
            />

            {/* Experience */}
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6 pl-8">
              Work Experience
            </p>
            <div className="space-y-8 pl-8 mb-16">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="exp-item relative opacity-0">
                  <div
                    className="absolute -left-8 top-2 w-3 h-3 rounded-full border-2"
                    style={{ borderColor: exp.color, background: "#050508" }}
                  />
                  <div
                    className="absolute -left-[calc(2rem+1px)] top-[14px] h-px w-4"
                    style={{ background: exp.color, opacity: 0.4 }}
                  />
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 border border-white/5 bg-obsidian/40 hover:border-white/10 transition-colors duration-300"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                      <div>
                        <h3 className="font-display text-xl text-ghost tracking-wide">{exp.role}</h3>
                        <p className="font-mono text-xs tracking-widest mt-1" style={{ color: exp.color }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs text-muted tracking-widest">{exp.period}</div>
                        <div
                          className="mt-1 px-2 py-0.5 font-mono text-xs tracking-widest border inline-block"
                          style={{ borderColor: exp.color + "40", color: exp.color }}
                        >
                          {exp.type}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex gap-3 text-sm font-body text-muted leading-relaxed">
                          <span className="text-ember/40 mt-0.5 shrink-0">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Education */}
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6 pl-8">
              Education
            </p>
            <div className="space-y-6 pl-8">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="edu-item relative opacity-0">
                  <div
                    className="absolute -left-8 top-2 w-3 h-3 rounded-full border-2"
                    style={{ borderColor: edu.color, background: "#050508" }}
                  />
                  <div
                    className="absolute -left-[calc(2rem+1px)] top-[14px] h-px w-4"
                    style={{ background: edu.color, opacity: 0.4 }}
                  />
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 border border-white/5 bg-obsidian/40 hover:border-white/10 transition-colors duration-300"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-display text-lg text-ghost tracking-wide">{edu.degree}</h3>
                      <span className="font-mono text-xs text-muted tracking-widest">{edu.period}</span>
                    </div>
                    <p className="font-mono text-xs tracking-widest mb-2" style={{ color: edu.color }}>
                      {edu.institution}
                    </p>
                    <p className="font-body text-muted text-sm leading-relaxed">{edu.detail}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
