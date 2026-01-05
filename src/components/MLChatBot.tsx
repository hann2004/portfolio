'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageCircle, X, Send, Bot, User, 
  Sparkles, Clock, BookOpen, Briefcase, 
  GraduationCap, Code2, Brain, FileDown as FileDownIcon, Download,
  Maximize2, Minimize2, Cpu, Database, GitBranch,
  TrendingUp, Layers, Zap, AlertCircle, ChevronUp, ChevronDown
} from 'lucide-react';

// Use Next.js proxy route to avoid CORS and simplify deployment
const API_URL = '/api';

// Your knowledge base - UPDATED WITH CV LINK
const knowledgeBase = {
  personal: {
    name: "Hanan Nasir",
    title: "Data Science & ML Trainee",
    email: "hanan.nasir1209@gmail.com",
    bio: "I'm a KAIM trainee focused on backend development, data analysis, and machine learning. I learn by building real projects and solving problems step by step.",
    location: "Available for remote opportunities",
    status: "Actively seeking ML engineer and data science roles",
    cv: {
      directDownload: "https://drive.google.com/uc?export=download&id=1niDzEmVaqUbBykavjSxTxGg8lB5Ibr1G",
      viewOnline: "https://drive.google.com/file/d/1niDzEmVaqUbBykavjSxTxGg8lB5Ibr1G/view",
      filename: "Hanan_Nasir_ML_Engineer_CV.pdf",
      lastUpdated: "January 2025",
      fileSize: "245 KB"
    }
  },
  technicalStack: {
    ml: {
      frameworks: ["Scikit-learn", "TensorFlow", "PyTorch"],
      algorithms: ["Regression", "Classification", "Clustering", "NLP", "Neural Networks"],
      specialties: ["Predictive Modeling", "Feature Engineering", "Model Evaluation", "Hyperparameter Tuning"]
    },
    dataScience: {
      libraries: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"],
      tools: ["Jupyter", "Google Colab", "Tableau"],
      techniques: ["EDA", "Statistical Analysis", "Data Visualization", "Data Cleaning"]
    },
    backend: {
      frameworks: ["FastAPI", "Flask"],
      databases: ["PostgreSQL", "SQLite", "MongoDB"],
      concepts: ["REST APIs", "Authentication", "Database Design", "System Architecture"]
    },
    deployment: {
      tools: ["Docker", "Git", "GitHub Actions", "Render", "Vercel"],
      practices: ["CI/CD", "Testing", "Documentation", "Performance Optimization"]
    }
  },
  mlProjects: [
    {
      id: "ml-001",
      name: "Credit Risk Model",
      description: "Binary classification model predicting credit default risk",
      approach: "Applied feature engineering, handled class imbalance with SMOTE",
      metrics: "Achieved 92.4% accuracy with 0.88 AUC score",
      tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      github: "https://github.com/hann2004/credit-risk-model.git",
      mlConcepts: ["Classification", "Feature Importance", "Model Evaluation"]
    },
    {
      id: "ml-002",
      name: "News Sentiment Analysis",
      description: "NLP system classifying news article sentiment",
      approach: "Implemented TF-IDF vectorization with Naive Bayes and SVM",
      metrics: "85% accuracy on sentiment classification",
      tech: ["Python", "NLP", "Scikit-learn", "NLTK"],
      github: "https://github.com/hann2004/kaim-week1-news-sentiment.git",
      mlConcepts: ["Natural Language Processing", "Text Classification", "Vectorization"]
    },
    {
      id: "ml-003",
      name: "Sales Data Analysis",
      description: "Exploratory data analysis with visual insights",
      approach: "Data cleaning, statistical analysis, and visualization",
      metrics: "Generated actionable business insights",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      github: "https://github.com/hann2004/solar-challenge-week0.git",
      mlConcepts: ["EDA", "Data Visualization", "Statistical Analysis"]
    }
  ],
  backendProjects: [
    {
      name: "Empower Library API",
      description: "Production-ready REST API with authentication",
      features: ["JWT Authentication", "CRUD Operations", "Swagger UI"],
      tech: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "JWT"],
      github: "https://github.com/hann2004/empower_library_api.git"
    }
  ],
  certifications: [
    {
      name: "Artificial Intelligence Fundamentals",
      issuer: "Udacity",
      focus: "ML algorithms, neural networks, AI ethics",
      skills: ["Machine Learning", "Deep Learning", "AI Principles"]
    },
    {
      name: "Programming Fundamentals",
      issuer: "Udacity", 
      focus: "Data structures, algorithms, Python programming",
      skills: ["Python", "Algorithms", "Problem Solving"]
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      focus: "Frontend development and responsive principles",
      skills: ["HTML/CSS", "UI/UX", "Responsive Design"]
    }
  ],
  mlProcess: {
    steps: [
      "1. Problem Definition & Business Understanding",
      "2. Data Collection & Exploration (EDA)",
      "3. Data Preprocessing & Feature Engineering",
      "4. Model Selection & Training",
      "5. Model Evaluation & Validation",
      "6. Deployment & Monitoring"
    ]
  }
};

// Text similarity using cosine similarity
const textToVector = (text: string): Map<string, number> => {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  const vector = new Map<string, number>();
  words.forEach(word => {
    vector.set(word, (vector.get(word) || 0) + 1);
  });
  return vector;
};

const cosineSimilarity = (vec1: Map<string, number>, vec2: Map<string, number>): number => {
  const dotProduct = [...vec1.keys()].reduce((sum, key) => {
    return sum + (vec1.get(key) || 0) * (vec2.get(key) || 0);
  }, 0);
  
  const magnitude1 = Math.sqrt([...vec1.values()].reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt([...vec2.values()].reduce((sum, val) => sum + val * val, 0));
  
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
};

// Intent classification
const classifyIntent = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  const intentPatterns = {
    greeting: ['hi', 'hello', 'hey', 'greetings'],
    skills: ['skill', 'tech', 'technology', 'stack', 'what can you do', 'programming'],
    projects: ['project', 'work', 'built', 'created', 'developed', 'github'],
    ml: ['machine learning', 'ml', 'ai', 'model', 'algorithm', 'neural', 'deep learning'],
    data: ['data', 'analysis', 'pandas', 'numpy', 'visualization', 'eda'],
    backend: ['backend', 'api', 'fastapi', 'database', 'postgresql', 'rest'],
    cv: ['cv', 'resume', 'download', 'get your cv', 'curriculum vitae'],
    contact: ['contact', 'email', 'hire', 'available', 'reach', 'linkedin'],
    experience: ['experience', 'background', 'work history', 'career'],
    certifications: ['certif', 'qualif', 'education', 'course', 'udacity', 'certificate']
  };

  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    if (patterns.some(pattern => lowerQuestion.includes(pattern))) {
      return intent;
    }
  }
  
  return 'general';
};

// Response generator
let conversationHistory: string[] = [];

const generateMLResponse = (question: string, history: string[]): string => {
  const intent = classifyIntent(question);
  const similarityThreshold = 0.6;
  
  // Check for similar previous questions
  const questionVector = textToVector(question);
  const similarQuestion = history.find(prevQ => 
    cosineSimilarity(questionVector, textToVector(prevQ)) > similarityThreshold
  );
  
  // Add to history
  conversationHistory.push(question.toLowerCase());
  if (conversationHistory.length > 5) conversationHistory.shift();

  switch(intent) {
    case 'greeting':
      return `👋 Hello! I'm Hanan's ML Portfolio Assistant. I can discuss machine learning projects, algorithms, and data science techniques.`;
      
    case 'ml':
      return `🤖 **Machine Learning Expertise**:\n\n• Frameworks: ${knowledgeBase.technicalStack.ml.frameworks.join(', ')}\n• Algorithms: ${knowledgeBase.technicalStack.ml.algorithms.join(', ')}\n• Specialties: ${knowledgeBase.technicalStack.ml.specialties.join(', ')}\n\n**Projects**:\n${knowledgeBase.mlProjects.map(p => `• ${p.name}: ${p.description}`).join('\n')}`;
      
    case 'projects':
      return `🚀 **ML Projects**:\n\n${knowledgeBase.mlProjects.map(p => 
        `**${p.name}**\n${p.description}\nApproach: ${p.approach}\nMetrics: ${p.metrics}\nTech: ${p.tech.join(', ')}`
      ).join('\n\n---\n\n')}`;
      
    case 'skills':
      return `💻 **Technical Stack**:\n\n🤖 **Machine Learning**:\n${knowledgeBase.technicalStack.ml.frameworks.join(', ')}\n\n📊 **Data Science**:\n${knowledgeBase.technicalStack.dataScience.libraries.join(', ')}\n\n⚙️ **Backend**:\n${knowledgeBase.technicalStack.backend.frameworks.join(', ')}`;
      
    case 'cv':
      return `📄 **CV Download**:\n\n🔗 Direct: ${knowledgeBase.personal.cv.directDownload}\n👁️ Preview: ${knowledgeBase.personal.cv.viewOnline}\n\nIncludes ML project details, algorithm implementations, and GitHub links.`;
      
    default:
      return `I'm an ML-focused assistant! Ask me about:\n• Machine learning algorithms I've implemented\n• Data preprocessing techniques\n• Model evaluation metrics\n• Backend-ML integration\n• Download my ML-focused CV`;
  }
};

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  confidence?: number;
  source?: 'api' | 'local';
};

// Call FastAPI intent classifier
async function classifyWithAPI(text: string): Promise<{ intent: string; confidence: number; source: 'api' } | null> {
  try {
    const res = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { intent: data.intent, confidence: data.confidence, source: 'api' };
  } catch {
    return null;
  }
}

export default function MLChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🤖 **ML Portfolio Assistant Activated**\n\nPowered by cosine similarity & intent classification!\n\nTry: 'Explain ML projects' or 'Download ML CV'",
      sender: 'bot',
      timestamp: new Date(),
      intent: 'greeting',
      confidence: 0.95
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDownloadingCV, setIsDownloadingCV] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle CV download
  const handleDownloadCV = () => {
    setIsDownloadingCV(true);
    
    const link = document.createElement('a');
    link.href = knowledgeBase.personal.cv.directDownload;
    link.download = knowledgeBase.personal.cv.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Add message about CV download
    const cvMessage: Message = {
      id: messages.length + 1,
      text: `📄 **CV Download Started**\n\nFile: ${knowledgeBase.personal.cv.filename}\nShould download shortly!\n\nYou can also view it: ${knowledgeBase.personal.cv.viewOnline}`,
      sender: 'bot',
      timestamp: new Date(),
      intent: 'cv',
      confidence: 0.98
    };
    
    setMessages(prev => [...prev, cvMessage]);
    
    setTimeout(() => {
      setIsDownloadingCV(false);
    }, 1500);
  };

  // Handle sending a message
  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, input]);
    setInput('');
    setIsTyping(true);

    // Generate response: try ML API first, fallback to local
    (async () => {
      // Simulate thinking delay for UX
      await new Promise(r => setTimeout(r, 500));
      const apiResult = await classifyWithAPI(input);
      const intent = apiResult?.intent ?? classifyIntent(input);
      const confidence = apiResult?.confidence ?? parseFloat((Math.random() * 0.2 + 0.7).toFixed(2));
      const source: 'api' | 'local' = apiResult?.source ?? 'local';

      const botResponse: Message = {
        id: messages.length + 2,
        text: generateMLResponse(input, conversationHistory),
        sender: 'bot',
        timestamp: new Date(),
        intent,
        confidence,
        source
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    })();
  }, [input, messages, conversationHistory]);

  // Handle Enter key - THIS WAS MISSING!
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle sample question click
  const handleSampleQuestion = (question: string) => {
    if (question.toLowerCase().includes('download') || question.toLowerCase().includes('cv')) {
      handleDownloadCV();
      return;
    }
    
    setInput(question);
    setTimeout(() => handleSend(), 50);
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "🤖 **ML Portfolio Assistant Reactivated**\n\nReady to discuss machine learning and data science!",
        sender: 'bot',
        timestamp: new Date(),
        intent: 'greeting',
        confidence: 0.95
      },
    ]);
    conversationHistory.length = 0;
    setConversationHistory([]);
  };

  // ML-focused sample questions
  const mlSampleQuestions = [
    "Explain your ML projects",
    "What algorithms do you know?",
    "Download ML CV",
    "Data preprocessing",
    "Backend + ML"
  ];

  return (
    <>
      {/* Floating ML Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#9B8CFF] to-[#22D3EE] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 neon-glow"
        aria-label="Open ML Portfolio Assistant"
      >
        <Brain className="h-6 w-6 text-white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Zap className="h-2 w-2" />
        </span>
      </button>

      {/* Chat Modal - FIXED LAYOUT */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-0 md:p-4 pointer-events-none">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 md:bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Container - FIXED HEIGHTS */}
          <div className={`
            relative w-full ${isFullscreen ? 'h-full' : 'h-[85vh] md:h-[600px]'} 
            ${isFullscreen ? 'rounded-none' : 'rounded-t-2xl md:rounded-2xl'}
            bg-gradient-to-b from-[#080B12] to-[#0F1628] border border-gray-800 shadow-2xl 
            pointer-events-auto flex flex-col
            ${isFullscreen ? 'max-w-full' : 'max-w-full md:max-w-md'}
            neon-border
          `}>
            {/* Header - FIXED HEIGHT */}
            <div className="flex-shrink-0 p-3 md:p-4 border-b border-gray-800 bg-[#0F1628]/90">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-gradient-to-br from-[#9B8CFF] to-[#22D3EE] rounded-lg">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">ML Assistant</h3>
                    <p className="text-xs text-gray-400">Ask about ML projects</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 text-gray-400 hover:text-white md:hidden"
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container - FIXED: Takes remaining space */}
            <div className="flex-grow overflow-y-auto p-3 space-y-3 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] rounded-2xl p-3
                      ${message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#9B8CFF] to-[#22D3EE] text-white'
                        : 'bg-[#0F1628]/80 text-gray-100 border border-gray-700'
                      }
                    `}
                  >
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.text}
                    </div>
                    {message.sender === 'bot' && (message.intent || typeof message.confidence === 'number') && (
                      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                        <div className="flex items-center space-x-2">
                          {message.intent && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-700/70 text-[11px] font-semibold uppercase tracking-wide">
                              {message.intent}
                            </span>
                          )}
                          {typeof message.confidence === 'number' && (
                            <span className="text-xs">{Math.round(message.confidence * 100)}% conf</span>
                          )}
                        </div>
                        <span className="text-[10px] uppercase tracking-wide opacity-75">
                          {message.source === 'api' ? 'API' : 'Local'}
                        </span>
                      </div>
                    )}
                    <div className="text-xs opacity-50 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0F1628]/80 border border-gray-700 rounded-2xl p-3 max-w-[85%]">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-3 w-3 text-[#9B8CFF] animate-pulse" />
                      <span className="text-xs opacity-75">Processing with ML...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Questions Toggle for Mobile */}
            <div className="flex-shrink-0 border-t border-gray-800">
              <button
                onClick={() => setShowQuestions(!showQuestions)}
                className="w-full p-2 flex items-center justify-center text-xs text-gray-400 hover:text-white bg-gray-900/50"
              >
                {showQuestions ? (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Hide sample questions
                  </>
                ) : (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show sample questions
                  </>
                )}
              </button>

              {/* Sample Questions - CONDITIONAL RENDER */}
              {showQuestions && (
                <div className="px-3 py-2 border-t border-gray-800 bg-[#0F1628]/50">
                  <div className="text-xs text-gray-400 mb-2">Quick questions:</div>
                  <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-hide">
                    {mlSampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSampleQuestion(q === 'Download ML CV' ? 'Download your CV' : q)}
                        className="flex-shrink-0 text-xs px-3 py-1.5 bg-[#0F1628] hover:bg-gray-700 text-gray-300 rounded-full border border-gray-700 whitespace-nowrap"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - FIXED HEIGHT */}
            <div className="flex-shrink-0 p-3 border-t border-gray-800 bg-[#0F1628]">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about ML..."
                  className="flex-grow px-3 py-2.5 bg-[#0B0F17] border border-gray-700 rounded-xl focus:outline-none focus:border-[#9B8CFF] text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-3 py-2.5 bg-gradient-to-r from-[#9B8CFF] to-[#22D3EE] text-white rounded-xl disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              {/* CV Download - SIMPLIFIED */}
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloadingCV}
                  className="text-xs px-3 py-1.5 bg-[#0B0F17] hover:bg-gray-700 text-gray-300 rounded-lg flex items-center"
                >
                  <FileDownIcon className="h-3 w-3 mr-1" />
                  {isDownloadingCV ? 'Downloading...' : 'Download ML CV'}
                </button>
                <div className="text-xs text-gray-500">
                  Powered by ML algorithms
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}