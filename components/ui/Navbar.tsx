"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
        scrolled
          ? "bg-void/85 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl tracking-widest text-ghost hover:text-ember transition-colors"
        >
          K<span className="text-ember">.</span>AGHAV
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              className="font-mono text-xs tracking-widest text-muted hover:text-ember transition-colors animated-underline uppercase"
            >
              <span className="text-ember/50 mr-1">0{i + 1}.</span>
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="mailto:aghavkailash4@gmail.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="px-5 py-2 border border-ember text-ember font-mono text-xs tracking-widest hover:bg-ember hover:text-void transition-all duration-300 uppercase"
          >
            Hire Me
          </motion.a>


        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
            className="block w-6 h-px bg-ghost origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block w-6 h-px bg-ghost"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
            className="block w-6 h-px bg-ghost origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden overflow-hidden bg-obsidian border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm tracking-widest text-ghost hover:text-ember transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:aghavkailash4@gmail.com"
                onClick={() => setOpen(false)}
                className="px-5 py-3 text-center border border-ember text-ember font-mono text-xs tracking-widest uppercase"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
