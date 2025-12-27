'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Calendar, ExternalLink, Sparkles, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  const [hovered, setHovered] = useState<string | null>(null);

  const contactLinks = [
    {
      id: 'github',
      icon: Github,
      url: 'https://github.com/hann2004',
      color: 'text-gray-300',
      bgColor: 'bg-gray-800 hover:bg-gray-700',
      label: 'GitHub',
      logo: null
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/hanan-nasir2014',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20 hover:bg-blue-900/30',
      label: 'LinkedIn',
      logo: null
    },
    {
      id: 'upwork',
      icon: Briefcase, // Add icon as fallback
      url: 'https://www.upwork.com/freelancers/~019735c5eb415f3c0e',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20 hover:bg-green-900/30',
      label: 'Upwork',
      // FIXED: Using a reliable Upwork logo source
      logo: 'https://cdn.worldvectorlogo.com/logos/upwork.svg'
    },
    {
      id: 'telegram',
      icon: null,
      url: 'https://t.me/Nabii24',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20 hover:bg-blue-900/30',
      label: 'Telegram',
      logo: 'https://cdn.worldvectorlogo.com/logos/telegram-1.svg'
    },
    {
      id: 'email',
      icon: Mail,
      url: 'mailto:hanan.nasir1209@gmail.com',
      color: 'text-red-400',
      bgColor: 'bg-red-900/20 hover:bg-red-900/30',
      label: 'Email',
      logo: null
    }
  ];

  return (
    <section id="contact" className="py-16 px-6 relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Minimal Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gray-900/30 backdrop-blur-sm border border-gray-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Connect</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">Get In Touch</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Let's discuss opportunities or collaborate on projects
          </p>
        </div>

        {/* TINY Logos Only - Super Minimal (5 logos now) */}
        <div className="flex justify-center space-x-4 mb-12">
          {contactLinks.map((link) => {
            const isHovered = hovered === link.id;
            
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 ${link.bgColor} border border-gray-800 rounded-xl transition-all duration-300 ${isHovered ? 'scale-110' : 'hover:scale-110'}`}
                onMouseEnter={() => setHovered(link.id)}
                onMouseLeave={() => setHovered(null)}
                title={link.label}
              >
                {link.logo ? (
                  <div className="relative w-5 h-5">
                    <Image
                      src={link.logo}
                      alt={`${link.label} logo`}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to icon if image fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {/* Fallback to icon if image doesn't load */}
                    {link.icon && (
                      <link.icon className={`h-5 w-5 ${link.color}`} style={{ display: 'none' }} />
                    )}
                  </div>
                ) : link.icon ? (
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                ) : null}
              </a>
            );
          })}
        </div>


        {/* Rest of your code remains the same... */}
        {/* Availability Status */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">Available for Work</span>
            </div>
            <div className="text-xs text-gray-500">
              • 
              <Calendar className="inline-block h-3 w-3 ml-2 mr-1" />
              Immediate Start
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Looking for:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                Data Science
              </span>
              <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs rounded-full">
                Backend Dev
              </span>
              <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                ML Projects
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a
            href="mailto:hanan.nasir1209@gmail.com"
            className="group flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Quick Email
            <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href="#projects"
            className="flex items-center justify-center px-5 py-2.5 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Browse Projects First
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 border-t border-gray-800 pt-6">
          {[
            { href: '#home', label: 'Home' },
            { href: '#projects', label: 'Projects' },
            { href: '#skills', label: 'Skills' },
            { href: '#certifications', label: 'Certifications' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Response Time Note */}
        <div className="text-center mt-6">
          <div className="text-gray-600 text-xs">
            Quick response guaranteed • Open to remote opportunities worldwide
          </div>
        </div>
      </div>
    </section>
  );
}