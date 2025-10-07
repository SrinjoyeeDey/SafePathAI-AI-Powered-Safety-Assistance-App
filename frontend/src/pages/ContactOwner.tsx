import React from 'react';
import { FaEnvelope, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactOwner: React.FC = () => {
  const email = '';
  const socials = {
    twitter: '',
    github: '',
    linkedin: '',
    whatsapp: '',
  };

  return (
    <div className="min-h-screen bg-background text-text dark:bg-gray-900 dark:text-white">
      {/* HERO */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Hi, I'm Rakshit Jain</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 flex items-center gap-3">
              <span className="text-primary">🚀</span>
              Full Stack Developer | AI/ML Explorer | Open Source Contributor
            </p>

            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
              Currently leading the Bunkify organization and diving deep into AI/ML. Built a Fake News Prediction Model and several full-stack apps using Next.js, React and Node.js. Open to collaborations and contributions.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-6">
              <a href="#projects" className="inline-flex items-center gap-3 bg-white text-black px-5 py-3 rounded-md shadow-md hover:shadow-lg transition">View Projects</a>
              <a href="#contact" className="inline-flex items-center gap-3 border border-gray-700 px-5 py-3 rounded-md hover:bg-gray-800 transition">Contact Me</a>
            </div>

            <div className="flex items-center gap-4">
              <a href={socials.github || '#'} onClick={(e) => { if (!socials.github) e.preventDefault(); }} className="text-2xl hover:opacity-90"><FaGithub /></a>
              <a href={socials.linkedin || '#'} onClick={(e) => { if (!socials.linkedin) e.preventDefault(); }} className="text-2xl hover:opacity-90"><FaLinkedin /></a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            {/* circular avatar placeholder using primary color ring */}
            <div className="w-56 h-56 rounded-full bg-primary ring-8 ring-red-600 shadow-lg flex items-center justify-center overflow-hidden">
              <div className="w-48 h-48 rounded-full bg-orange-500" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3">Crafting digital experiences that blend innovation with purpose.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Bunkify</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Smart Attendance Tracker</p>
                </div>
                <div className="text-sm text-green-400">Active</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Leading development of a revolutionary attendance tracker & bunk planner for students. Built with Next.js and AI-powered insights.</p>
              <div className="flex gap-3 flex-wrap mb-4">
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Next.js</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">React</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">AI-Powered</span>
              </div>
              <div className="flex gap-3">
                <a className="px-4 py-2 bg-white text-black rounded-md shadow-sm" href="#">Demo - Live Website</a>
                <a className="px-4 py-2 border rounded-md" href="#">GitHub Repo</a>
              </div>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-1">Fake News Detection</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">AI/ML Model (95.28% accuracy)</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Built a machine learning model that detects fake news using Python, scikit-learn, and NLP techniques.</p>
              <div className="flex gap-3 flex-wrap mb-4">
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Python</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Scikit-learn</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">NLP</span>
              </div>
              <div className="flex justify-end">
                <a className="px-4 py-2 bg-white text-black rounded-md shadow-sm" href="#">View Project</a>
              </div>
            </article>

            <article className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-1">Aashayein</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">The Life Saviours</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Member & developer for college social club. Built and maintain this impactful website for a great cause.</p>
              <div className="flex gap-3 flex-wrap mb-4">
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Next.js</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">React</span>
                <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Social Impact</span>
              </div>
              <div className="flex justify-end">
                <a className="px-4 py-2 bg-white text-black rounded-md shadow-sm" href="#">View Project</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT FORM LAST */}
      <section id="contact" className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <a href={email ? `mailto:${email}` : '#'} className="flex items-center gap-3 px-4 py-2 border rounded-md hover:shadow-lg transition-shadow duration-200" onClick={(e) => { if (!email) e.preventDefault(); }}>
                <FaEnvelope className="text-primary" /> <span>Email</span>
              </a>

              <a href={socials.twitter || '#'} onClick={(e) => { if (!socials.twitter) e.preventDefault(); }} className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <FaTwitter className="text-blue-400" /> <span>Twitter</span>
              </a>

              <a href={socials.github || '#'} onClick={(e) => { if (!socials.github) e.preventDefault(); }} className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <FaGithub /> <span>GitHub</span>
              </a>

              <a href={socials.linkedin || '#'} onClick={(e) => { if (!socials.linkedin) e.preventDefault(); }} className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <FaLinkedin className="text-blue-600" /> <span>LinkedIn</span>
              </a>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); }}>
              <input type="text" placeholder="Your name" className="w-full p-3 mb-3 border rounded-md bg-gray-50 dark:bg-gray-700" required />
              <input type="email" placeholder="Your email" className="w-full p-3 mb-3 border rounded-md bg-gray-50 dark:bg-gray-700" required />
              <textarea placeholder="Message" className="w-full p-3 mb-3 border rounded-md bg-gray-50 dark:bg-gray-700" rows={6} required />
              <div className="flex justify-end">
                <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactOwner;
