import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="bg-gray-200 dark:bg-gray-800 text-text dark:text-white pt-10 pb-6 px-6 md:px-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

      <div>
        <h2 className="text-lg font-semibold mb-3">SafePathAI</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          AI-powered safety assistance app providing real-time alerts and guidance. Stay safe wherever you go.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:text-primary transition-colors duration-200">Home</a></li>
          <li><a href="/dashboard" className="hover:text-primary transition-colors duration-200">Dashboard</a></li>
          <li><a href="/emergency" className="hover:text-primary transition-colors duration-200">Emergency</a></li>
          <li><a href="/contact-owner" className="hover:text-primary transition-colors duration-200">Contact</a></li>
          <li><a href="/favorites" className="hover:text-primary transition-colors duration-200">Favorites</a></li>
          <li><a href="/login" className="hover:text-primary transition-colors duration-200">Login</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Connect With Us</h2>
        <div className="flex space-x-4 mb-3 text-xl">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110"><FaTwitter /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110"><FaLinkedin /></a>
        </div>
      </div>

    </div>

    <div className="mt-10 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
      © 2025 SafePathAI. All rights reserved.
    </div>
  </footer>
);

export default Footer;