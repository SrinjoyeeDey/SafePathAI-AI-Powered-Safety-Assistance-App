import React from 'react';
import OwnerCard from '../components/OwnerCard';
import { FaEnvelope, FaTwitter, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const ContactOwner: React.FC = () => {
  const email = '';
  const portfolio = '';
  const socials = {
    twitter: '',
    github: '',
    linkedin: '',
    whatsapp: '',
  };

  return (
    <div className="min-h-screen p-6 bg-background text-text dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Contact the Owner</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OwnerCard
            name="Srinjoyee Dey"
            role="Founder & Maintainer"
            bio="Building SafePathAI — an AI-powered assistant for safer urban navigation. Open to collaboration and frontend contributions."
            photoSrc="/vite.svg"
            portfolio={portfolio}
            badges={["Open Source", "GSSoC 2025", "AI Enthusiast"]}
          />

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-4">Get in touch</h2>

            <div className="space-y-3">
              <a
                href={email ? `mailto:${email}` : '#'}
                className="flex items-center gap-3 px-4 py-2 border rounded-md hover:shadow-lg transition-shadow duration-200"
                onClick={(e) => { if (!email) { e.preventDefault(); } }}
              >
                <FaEnvelope className="text-primary" />
                <span>Email</span>
              </a>

              <div className="flex flex-wrap gap-3">
                <a
                  href={socials.twitter || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border rounded-md hover:scale-105 transition-transform duration-150"
                  onClick={(e) => { if (!socials.twitter) { e.preventDefault(); } }}
                >
                  <FaTwitter className="text-blue-400" /> <span>Twitter</span>
                </a>

                <a
                  href={socials.github || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border rounded-md hover:scale-105 transition-transform duration-150"
                  onClick={(e) => { if (!socials.github) { e.preventDefault(); } }}
                >
                  <FaGithub /> <span>GitHub</span>
                </a>

                <a
                  href={socials.linkedin || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border rounded-md hover:scale-105 transition-transform duration-150"
                  onClick={(e) => { if (!socials.linkedin) { e.preventDefault(); } }}
                >
                  <FaLinkedin className="text-blue-600" /> <span>LinkedIn</span>
                </a>

                <a
                  href={socials.whatsapp || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border rounded-md hover:scale-105 transition-transform duration-150"
                  onClick={(e) => { if (!socials.whatsapp) { e.preventDefault(); } }}
                >
                  <FaWhatsapp className="text-green-500" /> <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-4">
                <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-2">Send a message</h3>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full p-2 mb-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full p-2 mb-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    required
                  />
                  <textarea
                    placeholder="Message"
                    className="w-full p-2 mb-2 border rounded-md bg-gray-50 dark:bg-gray-700"
                    rows={4}
                    required
                  />

                  <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150" type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOwner;
