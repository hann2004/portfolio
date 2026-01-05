import { Palette, Server, Brain, TrendingUp } from 'lucide-react';

const journey = [
  {
    period: '2024',
    title: 'Machine Learning Engineer',
    description: 'KAIM training with 5-6 data analysis & ML projects. Building intelligent systems.',
    icon: Brain,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['FastAPI Library', 'ML Models', 'Data Analysis'],
  },
  {
    period: '2023-2024',
    title: 'Backend Developer',
    description: 'Built REST APIs with FastAPI, PostgreSQL. Focused on system architecture.',
    icon: Server,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['FastAPI Projects', 'Database Design', 'API Development'],
  },
  {
    period: '2024',
    title: 'Web Design Foundations',
    description: 'Completed virtual assistant & responsive web design certifications.',
    icon: Palette,
    color: 'from-[#9B8CFF] to-[#22D3EE]',
    projects: ['Portfolio Website', 'Responsive Designs', 'UI/UX Principles'],
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
  return (
    <section id="journey" className="py-20 px-6 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Development Journey</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From creating beautiful interfaces to building intelligent systems
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9B8CFF] to-[#22D3EE] hidden md:block"></div>

          <div className="space-y-12">
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={item.period}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'} mb-8 md:mb-0`}>
                    <div className="bg-[#0F1628] rounded-2xl p-8 shadow-xl hover-card border border-gray-800">
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
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} border-4 border-[#080B12]`}></div>
                  </div>

                  {/* Empty spacer for alignment */}
                  <div className="md:w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}