"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["All", "Resumes", "Presentations", "Research"];

const FILES = [
  {
    id: "f1",
    title: "Kailash Aghav — Resume",
    description: "Full resume covering Data Science, ML, Full-Stack Development and projects",
    file: "/downloads/resumes/Kailash_Aghav_Resume.pdf",
    type: "Resumes",
    format: "PDF",
    size: "~200 KB",
    icon: "📄",
    color: "#ff4d1c",
    date: "Jun 2026",
  },
];

export default function DownloadsSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? FILES : FILES.filter((f) => f.type === activeTab);

  return (
    <section id="downloads" className="relative section-pad overflow-hidden bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-ember tracking-widest">07 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Downloads</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost">
            FILES &amp;<br /><span className="text-ember">RESOURCES</span>
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                border: `1px solid ${activeTab === tab ? "#ff4d1c" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab ? "#ff4d1c" : "#5a5a72",
                background: activeTab === tab ? "rgba(255,77,28,0.08)" : "transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Files Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-3 py-20 text-center">
                <p className="font-mono text-muted text-sm">No files in this category yet.</p>
              </div>
            ) : (
              filtered.map((file) => (
                <motion.div key={file.id} whileHover={{ y: -4 }}
                  className="group relative border border-white/5 bg-void/40 hover:border-white/15 transition-all duration-500 p-6 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${file.color}, transparent)` }} />

                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{file.icon}</span>
                    <div className="flex gap-2">
                      <span className="font-mono text-xs px-2 py-1 border border-white/10 text-muted">{file.format}</span>
                      <span className="font-mono text-xs px-2 py-1 border border-white/10 text-muted">{file.size}</span>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">{file.date}</p>
                  <h3 className="font-display text-ghost text-lg leading-tight mb-2">{file.title}</h3>
                  <p className="font-body text-muted text-xs leading-relaxed mb-6">{file.description}</p>

                  <a href={file.file} download
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 px-4 py-2 border"
                    style={{ borderColor: file.color, color: file.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </a>

                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: file.color }} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
