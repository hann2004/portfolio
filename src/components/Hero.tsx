'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Sparkles, ArrowDown } from 'lucide-react';
import Image from 'next/image';

const roles = ['Data Science Trainee', 'Backend Development Trainee', 'ML Trainee'];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-28 pb-16 px-6 relative overflow-hidden matrix-bg">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#9B8CFF]/25 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-[#0F1628]/80 backdrop-blur-sm border border-gray-800 px-5 py-3 rounded-full">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-[#9B8CFF] animate-pulse" />
                  <div className="absolute -inset-1 bg-[#22D3EE]/18 rounded-full blur-sm"></div>
                </div>
                <span className="text-sm font-medium">
                  <span className={`text-gray-300 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {roles[currentRoleIndex]}
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                
                <span className="gradient-text block mt-2">Hanan Nasir</span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl text-gray-400 font-light">
                Where data becomes decisions, powered by models and code.
              </h2>
            </div>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              I'm a KAIM trainee focused on backend development, data analysis, and machine learning. 
              I learn by building real projects and solving problems step by step.
            </p>

            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-3xl font-bold gradient-text">7+</div>
                <div className="text-gray-400 text-sm mt-1">Real Projects</div>
              </div>
              <div className="text-center p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-3xl font-bold gradient-text">4</div>
                <div className="text-gray-400 text-sm mt-1">Certifications</div>
              </div>
              <div className="text-center p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-gray-400 text-sm mt-1">Technologies</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#projects" 
                className="group px-8 py-3.5 bg-gradient-to-r from-[#9B8CFF] to-[#22D3EE] text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center neon-glow"
              >
                <span>Explore My Work</span>
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
              <a 
                href="https://github.com/hann2004" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700 flex items-center"
              >
                <Github className="h-5 w-5 mr-2" />
                View GitHub
              </a>
            </div>
          </div>

          {/* Right Column - Clean Picture */}
          <div className="relative flex flex-col items-center">
            {/* Picture Container */}
            <div className="relative w-full h-[600px] mb-8">
              <Image
                src="/Portrait.png"
                alt="Hanan Nasir - Professional Portrait"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Social Links - Separated below picture */}
            <div className="flex justify-center space-x-6 mt-4">
              <a 
                href="https://github.com/hann2004" 
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-[#0F1628]/80 backdrop-blur-sm text-gray-400 rounded-lg hover:text-[#22D3EE] hover:bg-gray-700 transition-all duration-300"
                title="GitHub Profile"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/hanan-nasir2014" 
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-[#0F1628]/80 backdrop-blur-sm text-gray-400 rounded-lg hover:text-[#9B8CFF] hover:bg-gray-700 transition-all duration-300"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:hanan.nasir1209@gmail.com" 
                className="group p-3 bg-[#0F1628]/80 backdrop-blur-sm text-gray-400 rounded-lg hover:text-[#22D3EE] hover:bg-gray-700 transition-all duration-300"
                title="Send Email"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 pt-8 border-t border-gray-800/50">
          <a href="#projects" className="group animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm mb-2 group-hover:text-gray-400 transition-colors">
                View Projects
              </span>
              <ArrowDown className="h-6 w-6 text-gray-600 group-hover:text-[#9B8CFF] transition-colors" />
            </div>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .matrix-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239b8cff' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.32;
          z-index: -1;
        }
      `}</style>
    </section>
  );
}