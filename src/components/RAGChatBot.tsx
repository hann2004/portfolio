import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  type?: string;
  cv_url?: string;
}

export default function RAGChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input;

    const userMsg: Message = { sender: 'user', text: userInput };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput('');


    try {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/rag-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userInput,
          history: history,
          top_k: 4
        }),
      });

      const data = await res.json();

      // ✅ update messages
      setMessages((msgs) => [
        ...msgs,
        { 
          sender: 'assistant', 
          text: data.answer, 
          type: data.type, 
          cv_url: data.cv_url 
        }
      ]);

      // ✅ update history AFTER getting response
      setHistory(prev => [
        ...prev,
        { role: "user", content: userInput },
        { role: "assistant", content: data.answer }
      ]);

    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'assistant', text: 'Something went wrong. Try again.' }
      ]);
    }

    setLoading(false);
};

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#9B8CFF] to-[#22D3EE] hover:from-[#7a6fd1] hover:to-[#22D3EE] text-white rounded-full shadow-2xl p-5 flex items-center justify-center focus:outline-none border-4 border-white animate-bounce"
          aria-label="Open AI Assistant"
          style={{ boxShadow: '0 8px 32px 0 rgba(155,140,255,0.25)' }}
        >
          <Sparkles className="w-10 h-10" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[90vw] bg-gray-900/95 rounded-2xl border border-gray-800 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#0F1628] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#9B8CFF] animate-pulse" />
              <span className="font-semibold text-gray-100">AI Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-200 text-xl font-bold px-2"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-2 px-4 py-3 overflow-y-auto max-h-80">
            {messages.length === 0 && (
              <div className="text-gray-400 text-center">Ask me anything about Hanan!</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm flex items-center gap-2 ${msg.sender === 'user' ? 'bg-[#9B8CFF] text-white' : 'bg-gray-800 text-gray-200'}`}>
                  {msg.sender === 'assistant' && <Sparkles className="w-4 h-4 text-[#9B8CFF] flex-shrink-0 animate-pulse" />}
                  <span>
                    {msg.type === 'cv' && msg.cv_url ? (
                      <>
                        {msg.text}
                        <div className="mt-2">
                          <a
                            href={msg.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1 px-4 py-2 bg-gradient-to-r from-[#9B8CFF] to-[#22D3EE] text-white rounded-lg font-semibold shadow hover:scale-105 transition"
                          >
                            Download CV
                          </a>
                        </div>
                      </>
                    ) : (
                      msg.text
                    )}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 bg-gray-800 text-gray-400 text-sm animate-pulse">Thinking...</div>
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t border-gray-800 bg-[#0F1628] rounded-b-2xl">
            <input
              className="flex-1 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-gray-200 focus:outline-none focus:border-[#9B8CFF]"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-[#9B8CFF] hover:bg-[#7a6fd1] text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}