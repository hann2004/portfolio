'use client';

import { useEffect, useState } from 'react';
import { 
  Brain, Database, Code2, Server, 
  Terminal, Cpu, BarChart3, Sparkles
} from 'lucide-react';
import Image from 'next/image';

// Real Skills Data with LOGO URLs
const orbitSkills = [
  { 
    name: 'Python', 
    level: 90, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'text-yellow-400', 
    category: 'backend',
    description: 'Primary programming language'
  },
  { 
    name: 'FastAPI', 
    level: 85, 
    logo: 'https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png',
    color: 'text-green-400', 
    category: 'backend',
    description: 'Modern web framework'
  },
  { 
    name: 'PostgreSQL', 
    level: 80, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: 'text-blue-300', 
    category: 'backend',
    description: 'Relational database'
  },
  { 
    name: 'Next.js', 
    level: 75, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: 'text-gray-300', 
    category: 'frontend',
    description: 'React framework'
  },
  { 
    name: 'TypeScript', 
    level: 70, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'text-blue-400', 
    category: 'frontend',
    description: 'Typed JavaScript'
  },
  { 
    name: 'Tailwind', 
    level: 85, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: 'text-cyan-400', 
    category: 'frontend',
    description: 'Utility-first CSS'
  },
  { 
    name: 'Pandas', 
    level: 85, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    color: 'text-red-400', 
    category: 'datascience',
    description: 'Data manipulation'
  },
  { 
    name: 'Scikit-learn', 
    level: 75, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    color: 'text-orange-400', 
    category: 'ml',
    description: 'Machine learning'
  },
  { 
    name: 'NumPy', 
    level: 80, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    color: 'text-blue-400', 
    category: 'datascience',
    description: 'Numerical computing'
  },
  { 
    name: 'Jupyter', 
    level: 90, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    color: 'text-orange-500', 
    category: 'datascience',
    description: 'Notebook environment'
  },
  { 
    name: 'Git', 
    level: 85, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: 'text-red-500', 
    category: 'tools',
    description: 'Version control'
  },
  { 
    name: 'Docker', 
    level: 60, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: 'text-cyan-400', 
    category: 'tools',
    description: 'Containerization'
  },
  { 
    name: 'REST API', 
    level: 85, 
    logo: 'https://cdn.worldvectorlogo.com/logos/api-2.svg',
    color: 'text-purple-400', 
    category: 'backend',
    description: 'API design'
  },
  { 
    name: 'Matplotlib', 
    level: 80, 
    logo: 'https://matplotlib.org/stable/_static/logo2_compressed.svg',
    color: 'text-blue-400', 
    category: 'datascience',
    description: 'Data visualization'
  },
  { 
    name: 'Machine Learning', 
    level: 75, 
    logo: 'https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg',
    color: 'text-purple-400', 
    category: 'ml',
    description: 'AI algorithms'
  },
];

const categories = [
  { id: 'all', name: 'All Skills', icon: Sparkles, color: 'text-blue-400' },
  { id: 'backend', name: 'Backend', icon: Server, color: 'text-green-400' },
  { id: 'frontend', name: 'Frontend', icon: Code2, color: 'text-blue-400' },
  { id: 'datascience', name: 'Data Science', icon: BarChart3, color: 'text-red-400' },
  { id: 'ml', name: 'Machine Learning', icon: Brain, color: 'text-purple-400' },
  { id: 'tools', name: 'Tools', icon: Terminal, color: 'text-cyan-400' },
];

export default function Skills() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get skills based on active category
  const getFilteredSkills = () => {
    if (activeCategory === 'all') return orbitSkills;
    return orbitSkills.filter(skill => skill.category === activeCategory);
  };

  const filteredSkills = getFilteredSkills();

  const handleImageError = (skillName: string) => {
    setImageErrors(prev => ({ ...prev, [skillName]: true }));
  };

  const getFallbackContent = (skill: typeof orbitSkills[0]) => {
    return (
      <div className="text-center">
        <div className={`text-lg font-bold ${skill.color}`}>
          {skill.name.slice(0, 2)}
        </div>
      </div>
    );
  };

  // Distribute skills across orbits based on filtered count
  const getOrbitSkills = (orbitIndex: number) => {
    const skillsPerOrbit = Math.ceil(filteredSkills.length / 3);
    const startIndex = orbitIndex * skillsPerOrbit;
    const endIndex = Math.min(startIndex + skillsPerOrbit, filteredSkills.length);
    return filteredSkills.slice(startIndex, endIndex);
  };

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite ${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 px-6 py-3 rounded-full mb-6">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <span className="text-gray-300 font-medium">Technical Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional tools and technologies I use to build data-driven solutions
          </p>
        </div>

        {/* Category Filter - FIXED */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsAnimating(false);
                  setTimeout(() => setIsAnimating(true), 100);
                }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                }`}
              >
                <Icon className={`h-4 w-4 ${category.color}`} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Orbit Visualization - FIXED */}
        <div className="relative h-[500px] mb-16">
          {/* Central Sphere */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center animate-pulse">
              <div className="text-center">
                <Brain className="h-12 w-12 text-white mx-auto mb-2" />
                <div className="text-white font-bold text-sm">
                  {activeCategory === 'all' ? 'All Skills' : 
                   categories.find(c => c.id === activeCategory)?.name}
                </div>
                <div className="text-white/70 text-xs mt-1">
                  {filteredSkills.length} skills
                </div>
              </div>
            </div>
          </div>

          {/* Orbits - FIXED: Now shows only filtered skills */}
          {[0, 1, 2].map((orbitIndex) => {
            const orbitSkills = getOrbitSkills(orbitIndex);
            const orbitSize = 180 + orbitIndex * 100;
            
            if (orbitSkills.length === 0) return null;

            return (
              <div
                key={orbitIndex}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${orbitSize}px`,
                  height: `${orbitSize}px`,
                }}
              >
                {/* Orbit Ring */}
                <div 
                  className="absolute inset-0 border border-gray-800/30 rounded-full"
                  style={{
                    animation: isAnimating ? `spin ${25 + orbitIndex * 8}s linear infinite ${orbitIndex * 3}s` : 'none',
                  }}
                />
                
                {/* Skills on Orbit */}
                {orbitSkills.map((skill, skillIndex) => {
                  const angle = (skillIndex / orbitSkills.length) * 2 * Math.PI + (scrollY / 500);
                  const radius = orbitSize / 2;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={`${orbitIndex}-${skill.name}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animation: isAnimating ? `float ${4 + Math.random() * 2}s ease-in-out infinite ${skillIndex * 0.1}s` : 'none',
                      }}
                    >
                      <div 
                        className={`w-14 h-14 rounded-full bg-gray-900 border-2 ${skill.color.replace('text-', 'border-')} flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-125`}
                        style={{
                          transform: `scale(${0.7 + orbitIndex * 0.1})`,
                        }}
                      >
                        {imageErrors[skill.name] ? (
                          getFallbackContent(skill)
                        ) : (
                          <div className="relative w-10 h-10">
                            <Image
                              src={skill.logo}
                              alt={`${skill.name} logo`}
                              fill
                              className="object-contain"
                              onError={() => handleImageError(skill.name)}
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 min-w-[120px] text-center shadow-xl">
                          <div className="font-bold text-white">{skill.name}</div>
                          <div className="text-sm text-gray-400">{skill.description}</div>
                          <div className="text-blue-400 font-bold mt-1">{skill.level}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Skills List with Progress Bars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories
            .filter(category => category.id !== 'all') // Don't show "All Skills" as a category card
            .map((category) => {
              const Icon = category.icon;
              const categorySkills = orbitSkills.filter(skill => skill.category === category.id);
              
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={category.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-800">
                    <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-')}/20`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {categorySkills.length} skills
                      </p>
                    </div>
                  </div>
                  
                  {/* Skills with Progress Bars */}
                  <div className="space-y-5">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            {/* Skill Logo */}
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                              {imageErrors[skill.name] ? (
                                <span className={`text-lg font-bold ${skill.color}`}>
                                  {skill.name.slice(0, 2)}
                                </span>
                              ) : (
                                <div className="relative w-8 h-8">
                                  <Image
                                    src={skill.logo}
                                    alt={`${skill.name} logo`}
                                    fill
                                    className="object-contain"
                                    onError={() => handleImageError(skill.name)}
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-300">{skill.name}</div>
                              <div className="text-xs text-gray-500">{skill.description}</div>
                            </div>
                          </div>
                          <div className={`font-bold ${skill.color}`}>
                            {skill.level}%
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${skill.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>


      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}