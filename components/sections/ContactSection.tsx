"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParallax } from "react-scroll-parallax";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function GridPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
  });
  return (
    <mesh ref={meshRef as any} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial color="#ff4d1c" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

function ContactBg() {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 60 }} gl={{ alpha: true }}>
      <GridPlane />
      <pointLight position={[0, 5, 0]} color="#ff4d1c" intensity={2} />
    </Canvas>
  );
}

const SOCIALS = [
  { label: "GitHub",   handle: "@Kailashaghav",           href: "https://github.com/Kailashaghav" },
  { label: "LinkedIn", handle: "in/kailash-aghav4",       href: "https://www.linkedin.com/in/kailash-aghav4" },
  { label: "Email",    handle: "aghavkailash4@gmail.com", href: "mailto:aghavkailash4@gmail.com" },
  { label: "Phone",    handle: "+91 7499910833",           href: "tel:+917499910833" },
];

export default function ContactSection() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const { ref: parallax }   = useParallax<HTMLDivElement>({ speed: -4 });

  useGSAP(() => {
    gsap.fromTo(
      ".contact-el",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#contact", start: "top 70%" },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative section-pad overflow-hidden bg-obsidian clip-diagonal-reverse">
      {/* 3D BG */}
      <div className="absolute inset-0 z-0">
        <ContactBg />
      </div>
      <div className="absolute inset-0 bg-obsidian/88 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">05 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Contact</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div ref={parallax as any}>
            <div className="contact-el opacity-0">
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-ghost mb-6">
                LET&apos;S<br />
                <span className="text-ember">WORK</span><br />
                TOGETHER
              </h2>
            </div>

            <p className="contact-el opacity-0 font-body text-muted leading-relaxed mb-10 max-w-sm">
              Open to internships, freelance projects, full-time Data Science / Full-Stack
              roles, and creative collaborations. Let&apos;s build something extraordinary.
            </p>

            {/* Direct email */}
            <div className="contact-el opacity-0 mb-10">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">Direct Email</p>
              <motion.a
                href="mailto:aghavkailash4@gmail.com"
                whileHover={{ x: 4 }}
                className="font-display text-2xl text-ember hover:text-ghost transition-colors break-all"
              >
                aghavkailash4@gmail.com
              </motion.a>
            </div>

            {/* Socials */}
            <div className="contact-el opacity-0 grid grid-cols-2 gap-4">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="group flex flex-col p-4 border border-white/5 hover:border-ember/30 transition-all duration-300"
                >
                  <span className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
                    {s.label}
                  </span>
                  <span className="font-body text-ghost text-sm group-hover:text-ember transition-colors break-all">
                    {s.handle}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-el opacity-0">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] border border-aurora/30 p-12 text-center"
                >
                  <div className="text-aurora text-5xl mb-6">✓</div>
                  <h3 className="font-display text-3xl text-ghost mb-3">Message Sent!</h3>
                  <p className="font-body text-muted text-sm">I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Error message */}
                  {error && (
                    <div className="p-3 border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs">
                      ⚠ {error}
                    </div>
                  )}

                  {[
                    { key: "name",  label: "Your Name",    type: "text",  placeholder: "John Doe" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(form as Record<string, string>)[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        required
                        className="w-full bg-void/60 border border-white/10 px-4 py-3 font-body text-ghost text-sm focus:outline-none focus:border-ember/60 placeholder:text-muted transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block font-mono text-xs text-muted tracking-widest uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full bg-void/60 border border-white/10 px-4 py-3 font-body text-ghost text-sm focus:outline-none focus:border-ember/60 placeholder:text-muted transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full py-4 bg-ember text-void font-mono text-sm tracking-widest uppercase hover:bg-ghost transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
