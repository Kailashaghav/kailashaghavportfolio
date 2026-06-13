"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CERTIFICATES = [
  { id: "c1", title: "Cloud Infrastructure Analyst", issuer: "NASSCOM · Skill India", date: "Jun 2026", image: "/certificates/cert_cloud-1.jpg", color: "#ff4d1c", link: "", icon: "☁️" },
  { id: "c2", title: "Introduction to Cybersecurity Awareness", issuer: "HP LIFE · HP Foundation", date: "Jun 2025", image: "/certificates/cert_cybersec-1.jpg", color: "#38bdf8", link: "", icon: "🔐" },
  { id: "c3", title: "AI for Beginners", issuer: "HP LIFE · HP Foundation", date: "Jun 2025", image: "/certificates/cert_ai_beginners-1.jpg", color: "#00ffd1", link: "", icon: "🤖" },
  { id: "c4", title: "What Is Generative AI?", issuer: "LinkedIn Learning", date: "Jun 2026", image: "/certificates/cert_genai_linkedin-1.jpg", color: "#0077b5", link: "", icon: "🧠" },
  { id: "c5", title: "ArcGIS for Beginners: Mapping Urban Green Spaces", issuer: "Coursera Project Network", date: "Aug 2025", image: "/certificates/cert_arcgis-1.jpg", color: "#4ade80", link: "https://coursera.org/verify/L21DB69OXHO9", icon: "🗺️" },
  { id: "c6", title: "SQL and Relational Databases 101", issuer: "IBM Skills Network · CognitiveClass.ai", date: "Jun 2026", image: "/certificates/cert_sql_ibm-1.jpg", color: "#a78bfa", link: "https://courses.cognitiveclass.ai/certificates/b9f072f07d4d48febd8c0b1a16eb83f5", icon: "🗄️" },
  { id: "c7", title: "Generative AI for Beginners", issuer: "Simplilearn SkillUp", date: "Jun 2025", image: "/certificates/cert_genai_simplilearn-1.jpg", color: "#f59e0b", link: "", icon: "✨" },
  { id: "c8", title: "Full-Stack Development 101", issuer: "Simplilearn SkillUp", date: "Jun 2025", image: "/certificates/cert_fsd_simplilearn-1.jpg", color: "#f472b6", link: "", icon: "🌐" },
  { id: "c9", title: "Apache Spark 2.0 with Java — Big Data", issuer: "Udemy", date: "Apr 2026", image: "/certificates/cert_spark_udemy-1.jpg", color: "#ec4899", link: "https://ude.my/UC-b98982ca-cf61-4b95-a373-c6cf72596f4e", icon: "⚡" },
  { id: "c10", title: "Foundations of Prompt Engineering", issuer: "AWS Training & Certification", date: "Jun 2026", image: "/certificates/cert_aws_prompt-1.jpg", color: "#f97316", link: "https://skillbuilder.aws/learn/VF6H4SZ1BU/foundations-of-prompt-engineering/7U8XFUVXDT", icon: "🔧" },
  { id: "c11", title: "Amazon ElastiCache Getting Started", issuer: "AWS Training & Certification", date: "Jun 2026", image: "/certificates/cert_aws_elasticache-1.jpg", color: "#ff9900", link: "", icon: "🗃️" },
  { id: "c12", title: "Digital Marketing Certified", issuer: "HubSpot Academy", date: "Jun 2026", image: "/certificates/cert_hubspot_digital.jpg", color: "#ff7a59", link: "https://academy.hubspot.com/courses/digital-marketing", icon: "📊" },
  { id: "c13", title: "TechSprint Hackathon — Google Developer Group", issuer: "MGM University · Hack2Skill", date: "2025-26", image: "/certificates/cert_google_hackathon.jpg", color: "#4285f4", link: "", icon: "🏆" },
];

export default function CertificationsSection() {
  const [selected, setSelected] = useState<typeof CERTIFICATES[0] | null>(null);

  return (
    <section id="certifications" className="relative section-pad overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-ember tracking-widest">06 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Certifications</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost">
            CREDENTIALS<br /><span className="text-ember">&amp; LEARNING</span>
          </motion.h2>
          <motion.a href="/resume.pdf" download="Kailash_Aghav_Resume.pdf" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="group inline-flex items-center gap-3 px-8 py-4 border border-ember text-ember font-mono text-sm tracking-widest uppercase hover:bg-ember hover:text-void transition-all duration-300 self-start">
            <span>Download Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform duration-300"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} onClick={() => setSelected(cert)} className="group relative border border-white/5 bg-obsidian/40 hover:border-white/15 transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />
              <div className="relative w-full h-44 overflow-hidden bg-void/60">
                <Image src={cert.image} alt={cert.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-void/0 group-hover:bg-void/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-mono text-xs text-muted tracking-widest uppercase">{cert.date}</p>
                  <span className="text-lg">{cert.icon}</span>
                </div>
                <h3 className="font-display text-ghost text-base leading-tight mb-1">{cert.title}</h3>
                <p className="font-body text-muted text-xs">{cert.issuer}</p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 mt-3 font-mono text-xs tracking-widest uppercase transition-colors" style={{ color: cert.color }}>Verify ↗</a>
                )}
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: cert.color }} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 z-50 bg-void/90 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative max-w-3xl w-full bg-obsidian border border-white/10">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-muted hover:text-ghost border border-white/10 hover:border-white/30 transition-colors">✕</button>
              <div className="relative w-full" style={{ aspectRatio: "1.41/1" }}>
                <Image src={selected.image} alt={selected.title} fill className="object-contain" />
              </div>
              <div className="p-5 flex items-center justify-between border-t border-white/5">
                <div>
                  <h3 className="font-display text-ghost text-lg">{selected.title}</h3>
                  <p className="font-body text-muted text-sm">{selected.issuer} · {selected.date}</p>
                </div>
                {selected.link && (
                  <a href={selected.link} target="_blank" rel="noreferrer" className="px-5 py-2 border font-mono text-xs tracking-widest uppercase transition-colors" style={{ borderColor: selected.color, color: selected.color }}>Verify ↗</a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
