"use client";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const CERTIFICATIONS = [
  { id: "c1", title: "Machine Learning & Deep Learning using Python and TensorFlow", issuer: "Coursera", year: "2024", color: "#ff4d1c", icon: "🤖" },
  { id: "c2", title: "Power BI Dashboard Development and Data Analytics", issuer: "Microsoft · Power BI", year: "2024", color: "#00ffd1", icon: "📊" },
  { id: "c3", title: "Full Stack Web Development using React JS and Node JS", issuer: "Udemy", year: "2024", color: "#a78bfa", icon: "🌐" },
];
export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative section-pad overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-ember tracking-widest">06 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Certifications</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost">CREDENTIALS<br /><span className="text-ember">&amp; LEARNING</span></h2>
          <a href="/resume.pdf" download="Kailash_Aghav_Resume.pdf" className="inline-flex items-center gap-3 px-8 py-4 border border-ember text-ember font-mono text-sm tracking-widest uppercase hover:bg-ember hover:text-void transition-all duration-300">
            Download Resume ↓
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.id} className="group relative p-8 border border-white/5 bg-obsidian/40 hover:border-white/10 transition-all duration-500">
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />
              <div className="text-4xl mb-5">{cert.icon}</div>
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">{cert.year}</p>
              <h3 className="font-display text-ghost text-xl leading-tight mb-3">{cert.title}</h3>
              <p className="font-body text-muted text-sm">{cert.issuer}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: cert.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
