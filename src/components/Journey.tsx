"use client";

import { Palette, Server, Brain, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const journey = [
  {
    period: '2023',
    title: 'Web Design Foundations',
    description: 'Completed virtual assistant & responsive web design certifications.',
    icon: Palette,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['Portfolio Website', 'Responsive Designs', 'UI/UX Principles'],
  },
  {
    period: '2024/2025',
    title: 'Backend Developer',
    description: 'Built REST APIs with FastAPI, PostgreSQL. Focused on system architecture.',
    icon: Server,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['FastAPI Projects', 'Database Design', 'API Development'],
  },
  {
    period: '2025',
    title: 'Machine Learning Engineer',
    description: 'KAIM training with 5-6 data analysis & ML projects. Building intelligent systems.',
    icon: Brain,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['FastAPI Library', 'ML Models', 'Data Analysis'],
  },
  {
    period: 'Future',
    title: 'Full Stack AI Engineer',
    description: 'Combining design, backend, and ML to build complete AI-powered applications.',
    icon: TrendingUp,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['AI Applications', 'Full Stack Systems', 'Scalable Solutions'],
  },
];

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 20%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="journey" className="py-20 px-6 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Development Journey</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From creating beautiful interfaces to building intelligent systems
          </p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Base timeline */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-gray-800 rounded" />
          {/* Animated progress */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] origin-top bg-gradient-to-b from-[#9B8CFF] to-[#22D3EE] rounded shadow-[0_0_12px_2px_rgba(155,140,255,0.25)]"
            style={{ height: '100%', scaleY: lineScale }}
            aria-hidden
          />
          {/* Parallax glow */}
          <motion.span
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/3 w-48 h-48 rounded-full bg-[#9B8CFF]/10 blur-3xl"
            style={{ y: orbitY }}
            aria-hidden
          />

          <div className="space-y-12">
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={item.period}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 36, x: isEven ? 36 : -36 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.05 }}
                >
                  {/* Content Card */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} mb-8 md:mb-0`}>
                    <div className="bg-[#0F1628] rounded-2xl p-8 shadow-xl hover-card border border-gray-800 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                      <span className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#9B8CFF]/10 blur-3xl" />
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="ml-4 text-sm font-semibold text-gray-400">
                          {item.period}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-[#E5E7EB]">{item.title}</h3>
                      <p className="text-gray-400 mb-6">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {item.projects.map((project) => (
                          <span
                            key={project}
                            className="px-3 py-1 bg-[#0B0F17] border border-gray-800 rounded-full text-sm text-gray-300"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none z-10">
                    <div className="relative">
                      <span className={`absolute inset-0 rounded-full blur-md opacity-60 bg-gradient-to-r ${item.color}`}></span>
                      <div className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${item.color} border-4 border-[#080B12]`}></div>
                      <span className={`absolute -inset-1 rounded-full bg-gradient-to-r ${item.color} opacity-20 animate-ping`}></span>
                    </div>
                  </div>

                  {/* Connector from node to card */}
                  <motion.div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-24 ${isEven ? 'left-1/2 origin-left bg-gradient-to-r' : 'left-1/2 -translate-x-full origin-right bg-gradient-to-l'} from-[#9B8CFF] to-[#22D3EE]`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    aria-hidden
                  />

                  {/* Empty spacer for alignment */}
                  <div className="md:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}