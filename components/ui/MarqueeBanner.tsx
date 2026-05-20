"use client";

const ITEMS = [
  "React JS",
  "Python",
  "Machine Learning",
  "Three.js",
  "Next.js",
  "Power BI",
  "Node.js",
  "Big Data",
  "AWS",
  "Docker",
  "AR / VR",
  "Deep Learning",
  "TypeScript",
  "GSAP",
  "MongoDB",
  "Scikit-learn",
  "Tailwind CSS",
  "NLP",
];

export default function MarqueeBanner() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden bg-ember py-4 z-10">
      <div className="marquee-track whitespace-nowrap flex">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 mx-4">
            <span className="font-display text-void tracking-widest text-lg uppercase">
              {item}
            </span>
            <span className="text-void/40 text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
