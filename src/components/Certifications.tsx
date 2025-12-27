'use client';

import { useState } from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'Udacity',
    date: 'December 17, 2024',
    verifyUrl: 'https://www.udacity.com/certificate/e/396b6b6a-b2fa-11ef-a371-0f65554eb2f4',
    logo: 'https://imgs.search.brave.com/aNhTjwqkLhdbe20B2pC8jFrk_1_gKTENlkc2wVm5Fu8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kOTJt/cnA3aGV0Z2ZrLmNs/b3VkZnJvbnQubmV0/L2ltYWdlcy9zaXRl/cy9taXNjL1VkYWNp/dHlfbmV3L29yaWdp/bmFsLnBuZz8xNjUx/MTg1MzU3',
    skills: ['AI Basics', 'Machine Learning', 'Neural Networks'],
  },
  {
    title: 'Programming Fundamentals',
    issuer: 'Udacity',
    date: 'December 17, 2024',
    verifyUrl: 'https://www.udacity.com/certificate/e/511abeb6-a420-11ef-84c8-eb288ca7b4cc',
    logo: 'https://imgs.search.brave.com/aNhTjwqkLhdbe20B2pC8jFrk_1_gKTENlkc2wVm5Fu8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kOTJt/cnA3aGV0Z2ZrLmNs/b3VkZnJvbnQubmV0/L2ltYWdlcy9zaXRl/cy9taXNjL1VkYWNp/dHlfbmV3L29yaWdp/bmFsLnBuZz8xNjUx/MTg1MzU3',
    skills: ['Python', 'Data Structures', 'Algorithms'],
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'October 30, 2024',
    verifyUrl: 'https://freecodecamp.org/certification/fcc0d8a4408-1aa3-46c6-a92d-49f6020e75a7/responsive-web-design',
    logo: 'https://imgs.search.brave.com/0OdIMNI0Fsgr_FXVVqFoKbOXJARNmqZ9wJ-aTr5AqYY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/MS53ZWJjYXRhbG9n/LmlvL2NhdGFsb2cv/ZnJlZWNvZGVjYW1w/L2ZyZWVjb2RlY2Ft/cC1pY29uLWZpbGxl/ZC0yNTYucG5nP3Y9/MTc2Mzk0NTA4NzMw/MA',
    skills: ['HTML/CSS', 'Responsive Design', 'Web Accessibility'],
  },
  {
    title: 'Virtual Assistant Skills',
    issuer: 'ALX / AL Group',
    date: 'October 8, 2024',
    verifyUrl: 'https://intranet.alxswe.com/certificates/yZXYpFr5Ne',
    logo: 'https://imgs.search.brave.com/VOQ5mmTAWxHTTFKPp2EhbEiDLu5i5wSRGL36n7Irgm0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bG9jYWxpemVkLndv/cmxkL19uZXh0L2lt/YWdlP3VybD1odHRw/czovL2Nkbi5sb2Nh/bGl6ZWQud29ybGQv/NTI2N2VmYmUtMmRm/ZS00MmI2LTliZDct/YTI3NDk3ZmEyOThj/LzE3MjIzMzk5MDM1/MzMucG5nJnc9MjQ0/MCZxPTc1',
    skills: ['Digital Tools', 'Communication', 'Project Management'],
  },
];

export default function Certifications() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section id="certifications" className="py-20 px-6 bg-gray-950/50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 px-6 py-3 rounded-full mb-6">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-gray-300 font-medium">Verified Credentials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Official certifications from leading technology education platforms
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 card-3d"
            >
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {/* Real Logo with error handling - BIGGER & BETTER FITTING */}
                  <div className="w-20 h-20 rounded-lg bg-gray-800 p-2 flex items-center justify-center border border-gray-700">
                    {imageErrors[index] ? (
                      <div className="text-gray-400 text-sm font-bold text-center">
                        {cert.issuer.slice(0, 2)}
                      </div>
                    ) : (
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <img 
                          src={cert.logo} 
                          alt={`${cert.issuer} logo`}
                          className="max-w-full max-h-full object-contain"
                          onError={() => handleImageError(index)}
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '100%',
                            maxHeight: '100%'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                    <div className="text-gray-400">
                      <span className="font-medium">{cert.issuer}</span>
                      <span className="mx-2">•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-2" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Verification */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <span className="text-sm text-gray-500">Verification Status</span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify Online
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            All certificates are officially verified. Click "Verify Online" to view the official certification page.
          </p>
        </div>
      </div>
    </section>
  );
}