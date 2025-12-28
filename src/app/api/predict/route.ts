import { NextResponse } from 'next/server';

// Upstream FastAPI service URL (Render or local dev)
const BASE_URL = process.env.ML_API_URL ?? 'http://localhost:8000';

type PredictBody = { text?: string };
type PredictAPIResponse = {
  intent: string;
  confidence: number;
  probabilities?: Record<string, number>;
};

// Enhanced local intent classification with better responses
function classifyIntentLocal(question: string): { intent: string; confidence: number; response: string } {
  const lowerQuestion = (question || '').toLowerCase();
  
  const intentPatterns: Array<{
    intent: string;
    patterns: string[];
    response: string;
    confidence: number;
  }> = [
    {
      intent: 'greeting',
      patterns: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'],
      response: "Hello! 👋 I'm the AI assistant for Nabi's portfolio. I can tell you about his skills, projects, experience, and more. What would you like to know?",
      confidence: 0.95
    },
    {
      intent: 'skills',
      patterns: ['skill', 'tech', 'technology', 'stack', 'what can you do', 'programming', 'languages', 'tools'],
      response: "Nabi works with: **Frontend**: React, Next.js, TypeScript, Tailwind CSS | **Backend**: Node.js, FastAPI, PostgreSQL | **ML/AI**: Python, scikit-learn, TensorFlow | **DevOps**: Docker, Git, CI/CD",
      confidence: 0.92
    },
    {
      intent: 'projects',
      patterns: ['project', 'work', 'built', 'created', 'developed', 'github', 'portfolio', 'showcase'],
      response: "Check out the projects section! He has built: 1) **Full-stack applications** with React & Node.js 2) **ML models** for prediction tasks 3) **Data analysis** projects with Python 4) **This portfolio** with Next.js & FastAPI",
      confidence: 0.9
    },
    {
      intent: 'ml',
      patterns: ['machine learning', 'ml', 'ai', 'model', 'algorithm', 'neural', 'deep learning', 'prediction'],
      response: "Nabi has experience in machine learning including: - Supervised learning (classification, regression) - Natural Language Processing (NLP) - Model deployment with FastAPI - Data preprocessing and feature engineering",
      confidence: 0.88
    },
    {
      intent: 'contact',
      patterns: ['contact', 'email', 'hire', 'available', 'reach', 'linkedin', 'connect', 'get in touch'],
      response: "You can reach Nabi via: 📧 **Email**: Use the contact form above 📱 **LinkedIn**: Connect through his profile 💼 **Available for**: Full-time roles, freelance projects, collaborations",
      confidence: 0.9
    },
    {
      intent: 'experience',
      patterns: ['experience', 'background', 'work history', 'career', 'job', 'professional'],
      response: "Nabi has experience in full-stack development and machine learning, working on projects ranging from web applications to predictive models. Check the journey section for more details!",
      confidence: 0.85
    },
    {
      intent: 'cv',
      patterns: ['cv', 'resume', 'download', 'get your cv', 'curriculum vitae', 'certificate'],
      response: "The resume download is available in the contact section. It includes his education, work experience, skills, and certifications.",
      confidence: 0.9
    },
    {
      intent: 'about',
      patterns: ['who are you', 'what is this', 'about you', 'tell me about yourself'],
      response: "I'm an AI assistant for Nabi's portfolio website. I can answer questions about his skills, projects, and experience. The portfolio is built with Next.js 14 and has a chatbot powered by intent classification.",
      confidence: 0.95
    }
  ];

  for (const { intent, patterns, response, confidence } of intentPatterns) {
    if (patterns.some((p) => lowerQuestion.includes(p))) {
      return { intent, confidence, response };
    }
  }

  // Default response for general questions
  return {
    intent: 'general',
    confidence: 0.7,
    response: "That's interesting! I can help you learn more about Nabi's: • Technical skills and stack • Recent projects and code • Professional experience • How to contact him for opportunities. Try asking about specific areas!"
  };
}

// Proxy with timeout and graceful fallback
async function proxyPredict(text: string): Promise<PredictAPIResponse | null> {
  // Only try to proxy if ML_API_URL is explicitly set (not localhost)
  if (!process.env.ML_API_URL || BASE_URL.includes('localhost')) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as PredictAPIResponse;
    return data;
  } catch {
    clearTimeout(timeout);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PredictBody;
    const text = (body?.text || '').trim();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Try to use FastAPI if available
    const api = await proxyPredict(text);
    if (api) {
      // Add a friendly response based on intent
      const local = classifyIntentLocal(text);
      return NextResponse.json({ 
        ...api, 
        response: local.response,
        source: 'api' 
      });
    }

    // Use local intent detection (will always work)
    const local = classifyIntentLocal(text);
    return NextResponse.json({ 
      intent: local.intent, 
      confidence: local.confidence,
      response: local.response,
      source: 'local' 
    });
    
  } catch (err) {
    console.error('Chatbot error:', err);
    return NextResponse.json({ 
      error: 'Processing failed',
      response: "I'm having trouble processing that. Try asking about skills, projects, or experience!",
      source: 'error'
    }, { status: 500 });
  }
}

// Preflight support
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

// Health check
export async function GET() {
  const hasFastAPI = process.env.ML_API_URL && !process.env.ML_API_URL.includes('localhost');
  
  return NextResponse.json({ 
    status: 'healthy',
    mode: hasFastAPI ? 'api' : 'local',
    message: 'Portfolio chatbot is running',
    fastapi_available: hasFastAPI
  });
}