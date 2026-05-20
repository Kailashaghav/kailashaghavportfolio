import type { Metadata } from "next";
import "./globals.css";
import { ParallaxProvider } from "@/components/ui/ParallaxProvider";

export const metadata: Metadata = {
  title: "Kailash Aghav — Data Science & Full-Stack Developer",
  description:
    "Portfolio of Kailash Aghav — B.Tech Data Science student specialising in ML, React, Three.js and full-stack engineering.",
  keywords: [
    "Kailash Aghav",
    "Data Science",
    "Machine Learning",
    "React",
    "Next.js",
    "Three.js",
    "Full Stack",
    "Portfolio",
  ],
  authors: [{ name: "Kailash Aghav" }],
  openGraph: {
    title: "Kailash Aghav — Data Science & Full-Stack Developer",
    description: "3D Portfolio — Data Scientist & Creative Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ParallaxProvider>{children}</ParallaxProvider>
      </body>
    </html>
  );
}
