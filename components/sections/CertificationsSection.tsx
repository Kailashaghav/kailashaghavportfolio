"use client";

import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// ✏️  EDIT YOUR CERTIFICATIONS HERE — just change the text
// ─────────────────────────────────────────────────────────
const CERTIFICATIONS = [
  {
    id: "c1",
    title: "Machine Learning & Deep Learning using Python and TensorFlow",
    issuer: "Coursera",
    year: "2024",
    color: "#ff4d1c",
    icon: "🤖",
  },
  {
    id: "c2",
    title: "Power BI Dashboard Development and Data Analytics",
    issuer: "Microsoft · Power BI",
    year: "2024",
    color: "#00ffd1",
    icon: "📊",
  },
  {
    id: "c3",
    title: "Full Stack Web Development using React JS and Node JS",
    issuer: "Udemy",
    year: "2024",
    color: "#a78bfa",
    icon: "🌐",
  },
];
// ─────────────────────────────────────────────────────────

export default function CertificationsSection() {
  useGSAP(() => {
    gsap.fromTo(
      ".cert-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: "#certifications", start: "top 70%" },
      }
    );
  }, []);

  return (
    <section id="certifications" className="relative section-pad overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">06 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Certifications</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Heading + Download Resume Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost"
          >
            CREDENTIALS<br />
            <span className="text-ember">&amp; LEARNING</span>
          </motion.h2>

          {/* ── DOWNLOAD RESUME BUTTON ── */}
          <motion.a
            href="/resume.pdf"
            download="Kailash_Aghav_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-ember text-ember font-mono text-sm tracking-widest uppercase hover:bg-ember hover:text-void transition-all duration-300 self-start"
          >
            <span>Download Resume</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-y-1 transition-transform duration-300"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </motion.a>
        </div>

        {/* Certification Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="cert-card group relative p-8 border border-white/5 bg-obsidian/40 hover:border-white/10 transition-all duration-500 opacity-0"
              whileHover={{ y: -4 }}
            >
              {/* Top glow line on hover */}
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
              />

              {/* Icon */}
              <div className="text-4xl mb-5">{cert.icon}</div>

              {/* Year */}
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
                {cert.year}
              </p>

              {/* Title */}
              <h3
                className="font-display text-ghost text-xl leading-tight mb-3 group-hover:transition-colors duration-300"
                style={{ color: undefined }}
              >
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="font-body text-muted text-sm">
                {cert.issuer}
              </p>

              {/* Bottom color bar */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: cert.color }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
