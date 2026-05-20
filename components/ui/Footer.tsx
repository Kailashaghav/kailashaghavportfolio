"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-2xl tracking-widest text-ghost">
          K<span className="text-ember">.</span>AGHAV
        </span>
        <p className="font-mono text-xs text-muted tracking-widest">
          © 2025 Kailash Aghav — Crafted with ♥, Three.js & GSAP
        </p>
        <div className="flex gap-6">
          {[
            { label: "GitHub", href: "https://github.com/Kailashaghav" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/kailash-aghav4" },
            { label: "Email", href: "mailto:aghavkailash4@gmail.com" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-ember transition-colors tracking-widest uppercase"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
