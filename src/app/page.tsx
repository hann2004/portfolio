'use client';

import Hero from '@/components/Hero';
import Journey from '@/components/Journey';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import RAGChatBot from '@/components/RAGChatBot';

export default function Home() {
  return (
    <div className="bg-[#0a0a0f]">
      <Hero />
      <Journey />
      <Projects />
      <Certifications />
      <Skills />
      <Contact />
      <RAGChatBot />
    </div>
  );
}