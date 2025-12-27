'use client';

import { useState } from 'react';
import { Github, Brain, Database, FileText, Code } from 'lucide-react';
import Image from 'next/image';

// ORGANIZED BY CATEGORY
const projectSections = {
  datascience: {
    name: 'Data Science',
    icon: FileText,
    description: 'Data analysis and visualization projects',
    projects: [
      {
        id: 1,
        title: 'Sales Data Analysis System',
        description: 'Exploratory data analysis on sales data with visual insights and business recommendations.',
        longDescription: 'Comprehensive analysis of sales patterns, customer behavior, and revenue trends using Python data science stack. Generates actionable insights through statistical analysis and visualization.',
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter', 'Data Analysis'],
        githubUrl: 'https://github.com/hann2004/solar-challenge-week0.git',
        category: 'datascience',
        features: [
          'Data cleaning and preprocessing pipelines',
          'Statistical analysis and hypothesis testing',
          'Business insight generation and reporting',
          'Interactive Jupyter notebooks',
          'Data visualization with Matplotlib/Seaborn'
        ],
      },
      {
        id: 2,
        title: 'Fintech Reviews Analysis',
        description: 'Analysis of financial technology reviews using NLP techniques to extract customer insights.',
        longDescription: 'Processed and analyzed fintech reviews to identify trends, sentiment patterns, and key customer concerns. Includes text preprocessing, sentiment analysis, and topic modeling.',
        technologies: ['Python', 'Sentiment Analysis', 'TextBlob', 'WordCloud', 'Pandas', 'NLP'],
        githubUrl: 'https://github.com/hann2004/Kaim-week2-fintech-reviews.git',
        category: 'datascience',
        features: [
          'Review data collection and preprocessing',
          'Sentiment scoring and categorization',
          'Topic modeling and keyword extraction',
          'Customer insight generation',
          'Visualization of sentiment trends'
        ],
      }
    ]
  },
  
  ml: {
    name: 'Machine Learning',
    icon: Brain,
    description: 'ML models and predictive analytics',
    projects: [
      {
        id: 3,
        title: 'News Sentiment Analysis',
        description: 'Natural Language Processing project analyzing sentiment in news articles using text classification.',
        longDescription: 'Implemented sentiment analysis pipeline with text preprocessing, feature extraction, and machine learning classification. Evaluates multiple models for sentiment prediction.',
        technologies: ['Python', 'Scikit-learn', 'NLTK', 'Pandas', 'Text Processing', 'Model Evaluation'],
        githubUrl: 'https://github.com/hann2004/kaim-week1-news-sentiment.git',
        category: 'ml',
        features: [
          'Text preprocessing and tokenization pipelines',
          'Feature extraction and vectorization',
          'Sentiment classification models training',
          'Model evaluation with metrics',
          'Visualization of classification results'
        ],
      },
      {
        id: 4,
        title: 'Insurance Risk Analytics',
        description: 'Risk analysis project for insurance data focusing on predictive modeling and assessment.',
        longDescription: 'Applied statistical methods and predictive modeling to assess insurance risk factors and probabilities. Includes data exploration, feature engineering, and model development.',
        technologies: ['Python', 'Predictive Modeling', 'Scikit-learn', 'Risk Analytics', 'Statistics'],
        githubUrl: 'https://github.com/hann2004/kaim-week3-insurance-risk-analytics-acis.git',
        category: 'ml',
        features: [
          'Risk factor identification and analysis',
          'Predictive model development and validation',
          'Statistical analysis of risk factors',
          'Risk assessment and probability scoring',
          'Model performance evaluation'
        ],
      },
      {
        id: 5,
        title: 'Credit Risk Modeling System',
        description: 'Machine learning model for credit risk assessment with evaluation metrics.',
        longDescription: 'Built and evaluated machine learning models for credit risk prediction using real financial data. Includes data preprocessing, feature engineering, and model comparison.',
        technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Model Evaluation'],
        githubUrl: 'https://github.com/hann2004/credit-risk-model.git',
        category: 'ml',
        features: [
          'Data preprocessing and feature engineering',
          'Multiple model training and comparison',
          'Performance metric evaluation',
          'Feature importance analysis',
          'Model interpretation and validation'
        ],
      }
    ]
  },
  
  backend: {
    name: 'Backend Projects',
    icon: Database,
    description: 'Server-side applications and APIs',
    projects: [
      {
        id: 6,
        title: 'Empower Library API',
        description: 'FastAPI RESTful API with JWT authentication, PostgreSQL, and automated Swagger documentation.',
        longDescription: 'Complete library management system with user authentication, book CRUD operations, and comprehensive API documentation. Features include token-based authentication, database modeling with SQLAlchemy, and automated API documentation generation.',
        technologies: ['FastAPI', 'PostgreSQL', 'JWT', 'SQLAlchemy', 'Pydantic', 'Python'],
        githubUrl: 'https://github.com/hann2004/empower_library_api.git',
        category: 'backend',
        features: [
          'User registration & authentication with JWT tokens',
          'Complete book management CRUD operations',
          'Automated Swagger UI documentation',
          'Database modeling with SQLAlchemy ORM',
          'Input validation with Pydantic models',
          'Error handling and logging'
        ],
        image: '/library.png',
        imageAlt: 'FastAPI Library Swagger Documentation',
      }
    ]
  },
  
  frontend: {
    name: 'Frontend Projects',
    icon: Code,
    description: 'User interfaces and web applications',
    projects: [
      {
        id: 7,
        title: 'Library Frontend Interface',
        description: 'React-based frontend for the Empower Library system with responsive design.',
        longDescription: 'User interface for library management system with book browsing, user dashboard, and responsive design. Implements API integration with the backend system.',
        technologies: ['React', 'JavaScript', 'CSS', 'API Integration', 'Responsive Design'],
        githubUrl: 'https://github.com/hann2004/library-frontend.git',
        category: 'frontend',
        features: [
          'Book catalog browsing interface with search',
          'User authentication and session management',
          'Responsive mobile-first design',
          'API integration with backend services',
          'Interactive user dashboard'
        ],
        image: '/library-front.png',
        imageAlt: 'Library Frontend Interface',
      }
    ]
  }
};

const sections = [
  { id: 'datascience', name: 'Data Science', icon: FileText, description: 'Data analysis and visualization projects' },
  { id: 'ml', name: 'Machine Learning', icon: Brain, description: 'ML models and predictive analytics' },
  { id: 'backend', name: 'Backend Projects', icon: Database, description: 'Server-side applications and APIs' },
  { id: 'frontend', name: 'Frontend Projects', icon: Code, description: 'User interfaces and web applications' },
];

export default function Projects() {
  const [selectedSection, setSelectedSection] = useState('datascience'); // Start with Data Science
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const currentSection = projectSections[selectedSection as keyof typeof projectSections];
  const currentProjects = currentSection?.projects || [];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 px-6 py-3 rounded-full mb-6">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="text-gray-300 font-medium">Project Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Organized by technology focus - data science, machine learning, and backend development
          </p>
        </div>

        {/* Category Tabs - Horizontal */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`flex flex-col items-center px-6 py-4 rounded-xl transition-all duration-300 min-w-[180px] ${
                  selectedSection === section.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                }`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="font-medium text-sm mb-1">{section.name}</span>
                <span className="text-xs opacity-75">{section.description}</span>
              </button>
            );
          })}
        </div>

        {/* Current Section Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                {(() => {
                  const Icon = currentSection.icon;
                  return <Icon className="h-6 w-6 text-blue-400" />;
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentSection.name}</h3>
                <p className="text-gray-500">{currentSection.description}</p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              {currentProjects.length} {currentProjects.length === 1 ? 'Project' : 'Projects'}
            </div>
          </div>
        </div>

        {/* Projects Grid for Selected Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentProjects.map((project: any) => (
            <div
              key={project.id}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Project Image Preview (Smaller) */}
              {project.image && (
                <div className="h-48 overflow-hidden border-b border-gray-800">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.imageAlt || project.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Project Header with Icon */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      project.category === 'ml' ? 'bg-purple-900/30' :
                      project.category === 'datascience' ? 'bg-blue-900/30' :
                      project.category === 'backend' ? 'bg-green-900/30' : 'bg-cyan-900/30'
                    }`}>
                      {project.category === 'ml' ? <Brain className="h-6 w-6 text-purple-400" /> :
                       project.category === 'datascience' ? <FileText className="h-6 w-6 text-blue-400" /> :
                       project.category === 'backend' ? <Database className="h-6 w-6 text-green-400" /> :
                       <Code className="h-6 w-6 text-cyan-400" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-sm text-gray-500 uppercase tracking-wider">
                        {project.category} Project
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">
                  {project.description}
                </p>

                {/* Technologies - Cleaner Display */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 5).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-3 py-1.5 bg-gray-800 text-gray-500 rounded-lg text-xs">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Project Features */}
                <div>
                  <h4 className="font-bold text-gray-300 mb-4">Key Features:</h4>
                  <ul className="space-y-3 mb-6">
                    {project.features.slice(0, 3).map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start">
                        <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{project.features.length - 3} more features
                      </li>
                    )}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Source Code
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-3 border border-gray-700 text-gray-400 rounded-lg hover:border-gray-600 hover:text-white transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-lg ${
                        selectedProject.category === 'ml' ? 'bg-purple-900/30' :
                        selectedProject.category === 'datascience' ? 'bg-blue-900/30' :
                        selectedProject.category === 'backend' ? 'bg-green-900/30' : 'bg-cyan-900/30'
                      }`}>
                        {selectedProject.category === 'ml' ? <Brain className="h-6 w-6 text-purple-400" /> :
                         selectedProject.category === 'datascience' ? <FileText className="h-6 w-6 text-blue-400" /> :
                         selectedProject.category === 'backend' ? <Database className="h-6 w-6 text-green-400" /> :
                         <Code className="h-6 w-6 text-cyan-400" />}
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase text-sm block">
                          {selectedProject.category} Project
                        </span>
                        <h3 className="text-3xl font-bold mt-1">{selectedProject.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-400 text-lg">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-white p-2 bg-gray-800 rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                {/* Project Image in Modal (if exists) */}
                {selectedProject.image && (
                  <div className="mb-8 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gray-950 p-4 border-b border-gray-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        {selectedProject.title} Preview
                      </div>
                    </div>
                    <div className="p-4 bg-gray-900">
                      <div className="relative h-64 w-full">
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.imageAlt || selectedProject.title}
                          fill
                          className="object-contain rounded border border-gray-800"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Description */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-300">Project Overview</h4>
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <p className="text-gray-400 leading-relaxed">{selectedProject.longDescription}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-300">Key Features</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.features.map((feature: string, idx: number) => (
                      <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-3 mt-1">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-300">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-4 py-2.5 bg-gray-800 text-gray-300 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8 border-t border-gray-800">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform font-medium"
                  >
                    <Github className="h-5 w-5 mr-3" />
                    View Source Code on GitHub
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3.5 border border-gray-700 text-gray-400 rounded-lg hover:border-gray-600 hover:text-white transition-colors font-medium"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}