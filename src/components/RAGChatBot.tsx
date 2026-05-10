'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  type?: string;
  cv_url?: string;
}

interface HistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export default function RAGChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false); // cold start warning
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const slowLoadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // clear cold start timer on unmount
  useEffect(() => {
    return () => {
      if (slowLoadTimerRef.current) clearTimeout(slowLoadTimerRef.current);
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userInput = input.trim();
    setInput('');
    setLoading(true);
    setSlowLoad(false);

    // Add user message immediately
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);

    // Show cold start warning after 4 seconds on first message
    if (isFirstMessage) {
      slowLoadTimerRef.current = setTimeout(() => {
        setSlowLoad(true);
      }, 4000);
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

      const res = await fetch(`${API_URL}/rag-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userInput,
          history: history, // always send current history
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();

      // Add assistant message
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: data.answer,
          type: data.type,
          cv_url: data.cv_url,
        },
      ]);

      // Update history AFTER response — append both turns
      setHistory(prev => [
        ...prev,
        { role: 'user', content: userInput },
        { role: 'assistant', content: data.answer },
      ]);

      setIsFirstMessage(false);

    } catch {
      setMessages(prev => [
        ...prev,
        { sender: 'assistant', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
      setSlowLoad(false);
      if (slowLoadTimerRef.current) clearTimeout(slowLoadTimerRef.current);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#9B8CFF] to-[#22D3EE] hover:from-[#7a6fd1] hover:to-[#1bb8d4] text-white rounded-full shadow-2xl p-5 flex items-center justify-center focus:outline-none border-4 border-white animate-bounce transition-all"
          aria-label="Open AI Assistant"
          style={{ boxShadow: '0 8px 32px 0 rgba(155,140,255,0.35)' }}
        >
          <Sparkles className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[92vw] bg-gray-900/97 rounded-2xl border border-gray-700/60 shadow-2xl flex flex-col"
          style={{ boxShadow: '0 8px 40px 0 rgba(155,140,255,0.18)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#0F1628] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#9B8CFF] animate-pulse" />
              <span className="font-semibold text-gray-100 text-sm">Hanan's AI Assistant</span>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto max-h-72 min-h-[80px]">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center text-sm mt-4">
                Ask me anything about Hanan 👋
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-xl px-3 py-2 max-w-[85%] text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#9B8CFF] text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <Sparkles className="w-3 h-3 text-[#9B8CFF] inline mr-1 mb-0.5 flex-shrink-0" />
                  )}

                  {msg.type === 'cv' && msg.cv_url ? (
                    <>
                      <span>{msg.text}</span>
                      <div className="mt-2">
                        <a
                          href={msg.cv_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1.5 bg-gradient-to-r from-[#9B8CFF] to-[#22D3EE] text-white rounded-lg text-xs font-semibold shadow hover:opacity-90 transition"
                        >
                          Download CV
                        </a>
                      </div>
                    </>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl px-3 py-2 bg-gray-800 text-gray-400 text-sm">
                  <span className="animate-pulse">Thinking...</span>
                  {/* Cold start warning — only shows if first message takes >4s */}
                  {slowLoad && (
                    <p className="text-gray-500 text-xs mt-1">
                      ⏳ Server is waking up, give it a few seconds...
                    </p>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="flex gap-2 p-3 border-t border-gray-800 bg-[#0F1628] rounded-b-2xl"
          >
            <input
              className="flex-1 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-[#9B8CFF] placeholder-gray-600 transition-colors"
              type="text"
              placeholder="Ask about Hanan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#9B8CFF] hover:bg-[#7a6fd1] text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-40 flex items-center justify-center"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
