import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/emergency", label: "Emergency" },
    { href: "/favorites", label: "Favorites" },
    { href: "/login", label: "Login" }
  ];

  const socialLinks = [
    { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
    { href: "https://github.com", icon: FaGithub, label: "GitHub" },
    { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-200 dark:bg-gray-800 text-text dark:text-white pt-10 pb-6 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.h2 
            className="text-lg font-semibold mb-3"
          >
            SafePathAI
          </motion.h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            AI-powered safety assistance app providing real-time alerts and guidance. Stay safe wherever you go.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h2 
            className="text-lg font-semibold mb-3"
          >
            Quick Links
          </motion.h2>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <a 
                  href={link.href} 
                  className="hover:text-primary transition-colors duration-200 inline-block"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2 
            className="text-lg font-semibold mb-3"
          >
            Connect With Us
          </motion.h2>
          <div className="flex space-x-4 mb-3 text-xl">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-10 pt-4 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        © 2025 SafePathAI. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
