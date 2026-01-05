'use client';

import { useState } from 'react';
import { Menu, X, Brain, Code2, Database } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#0F1628]/90 backdrop-blur-xl z-50 border-b border-gray-800 neon-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-[#9B8CFF] to-[#22D3EE] rounded-lg neon-glow">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl">Hanan Nasir</div>
              <div className="text-xs text-gray-400">Data Science & ML Trainee</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors hover:scale-105"
              >
                {item.name}
              </a>
            ))}
            
            {/* Tech Icons */}
            <div className="flex items-center space-x-3 ml-6">
              <div className="p-2 bg-gray-800 rounded-full">
                <Brain className="h-4 w-4 text-[#9B8CFF]" />
              </div>
              <div className="p-2 bg-gray-800 rounded-full">
                <Database className="h-4 w-4 text-[#22D3EE]" />
              </div>
              <div className="p-2 bg-gray-800 rounded-full">
                <Code2 className="h-4 w-4 text-[#9B8CFF]" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white py-2 px-4 bg-gray-800/50 rounded-lg"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}