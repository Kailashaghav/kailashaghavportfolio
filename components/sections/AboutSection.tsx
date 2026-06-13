"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutCanvas = dynamic(() => import("@/components/3d/AboutCanvas"), { ssr: false });

const FACTS = [
  { label: "Location",  value: "CHH. Nagar, IN" },
  { label: "Degree",    value: "B.Tech Data Science" },
  { label: "Minor",     value: "AR & VR" },
  { label: "CGPA",      value: "8.0 / 10" },
  { label: "Stack",     value: "React · Python · Three.js" },
  { label: "Status",    value: "Open to Opportunities ✓" },
];


const PHOTOS = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
];

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % PHOTOS.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative w-full h-full">
      {PHOTOS.map((src, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
          <Image src={src} alt="Kailash Aghav" fill className="object-cover object-top" />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: i === current ? '#ff4d1c' : 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
    </div>
  );
}
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: textParallax }   = useParallax<HTMLDivElement>({ speed: -5 });
  const { ref: canvasParallax } = useParallax<HTMLDivElement>({ speed: 8 });

  useGSAP(() => {
    gsap.fromTo(
      ".about-line",
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#about", start: "top 75%" },
      }
    );
    gsap.fromTo(
      ".fact-row",
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: "#about", start: "top 65%" },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef as any} className="relative section-pad overflow-hidden bg-obsidian">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ember/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">01 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">About Me</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textParallax as any}>
            <h2 className="about-line font-display text-[clamp(2.8rem,7vw,6rem)] leading-none text-ghost mb-8">
              DATA<br />
              <span className="text-ember">MEETS</span><br />
              CODE
            </h2>

            <p className="about-line font-body text-muted text-lg leading-relaxed mb-5">
              I'm <span className="text-ghost font-semibold">Kailash Aghav</span> — a B.Tech
              Data Science student with a minor in Augmented & Virtual Reality. I bridge the
              gap between intelligent data systems and modern immersive web experiences.
            </p>
            <p className="about-line font-body text-muted leading-relaxed mb-5">
              From building ML-powered recommendation engines using NLP and cosine similarity,
              to crafting 3D web apps with Three.js & R3F — I believe great software should
              be both <span className="text-ghost">technically sound</span> and{" "}
              <span className="text-ghost">visually extraordinary</span>.
            </p>
            <p className="about-line font-body text-muted leading-relaxed mb-10">
              Passionate about Big Data, Deep Learning, and Cyber Security. I follow Agile /
              Scrum methodologies and CI/CD best practices across every project I ship.
            </p>

            {/* Facts grid */}
            <div className="grid grid-cols-2 gap-0 border border-white/5">
              {FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`fact-row p-5 ${i % 2 === 0 ? "border-r border-white/5" : ""} ${
                    i < FACTS.length - 2 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div className="font-mono text-xs text-ember/60 tracking-widest mb-1 uppercase">
                    {fact.label}
                  </div>
                  <div
                    className={`font-body text-sm ${
                      fact.label === "Status" ? "text-aurora" : "text-ghost"
                    }`}
                  >
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href="https://github.com/Kailashaghav"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              className="about-line inline-flex items-center gap-3 mt-8 font-mono text-xs text-ember tracking-widest uppercase group"
            >
              <span>View GitHub</span>
              <span className="w-8 h-px bg-ember group-hover:w-16 transition-all duration-300" />
              <span>↗</span>
            </motion.a>
          </div>

          
          <div ref={canvasParallax as any} className="relative h-[500px] overflow-hidden">
            <AboutCanvas />
            <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-ember/30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-ember/30 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
