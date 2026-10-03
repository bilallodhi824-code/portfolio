import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bilal Khan Lodhi | Senior Full-Stack & Next.js Web Developer",
  description: "Professional portfolio of Bilal Khan Lodhi, specializing in Next.js 15 App Router, TypeScript, high-concurrency microservices, and modern Web design systems.",
  keywords: ["Bilal Khan Lodhi", "Next.js Developer", "Full Stack Engineer", "TypeScript Architect", "React Developer", "Karachi Developer", "Web Portfolio"],
  authors: [{ name: "Bilal Khan Lodhi" }],
  openGraph: {
    title: "Bilal Khan Lodhi | Senior Full-Stack & Next.js Web Developer",
    description: "High-performance Next.js 15 applications, microservices, and interactive UI systems.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth font-sans"
    >
      <body className="min-h-full flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
