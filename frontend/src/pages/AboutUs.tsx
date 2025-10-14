import React, { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaBullseye,
  FaEye,
  FaUsers,
  FaBell,
  FaGlobe,
  FaPaperPlane,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import {
  FaLightbulb,
  FaRocket,
  FaInfinity,
  FaShieldAlt,
  FaBrain,
  FaFirstAid,
} from "react-icons/fa";
import StoryCard from "../components/StoryCard";
import ImpactCounter from "../components/ImpactCounter";
import TeamMemberCard from "../components/TeamMemberCard";
import Section from "../components/Section";
import FeatureCard from "../components/FeatureCard";
import WorkflowStepCard from "../components/WorkflowStepCard";
import { useAboutUsData } from "../hooks/useAboutUsData";

const iconMap: { [key: string]: IconType } = {
  FaUsers,
  FaBell,
  FaGlobe,
  FaLightbulb,
  FaRocket,
  FaInfinity,
  FaShieldAlt,
  FaBrain,
  FaFirstAid,
};

/**
 * The About Us page component.
 *
 * This component serves as the main view for the "About Us" section of the application.
 * It fetches and displays various pieces of information about the SafePathAI project, including:
 * - The company's mission and vision.
 * - Community stories and testimonials.
 * - Key impact statistics.
 * - Reasons to choose the service.
 * - A timeline of the project's journey.
 * - Profiles of the team members.
 * - A contact form.
 *
 * It utilizes the `useAboutUsData` custom hook to manage data fetching and loading states.
 * @returns {React.ReactElement} The rendered About Us page.
 */
const AboutUs: React.FC = () => {
  const {
    teamData,
    stories,
    impactData,
    timelineData,
    whyChooseUsData,
    workflowData,
    loading,
  } = useAboutUsData();

  const [isContactVisible, setIsContactVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = "About Us | SafePathAI";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContactVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-24">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About SafePathAI
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Leveraging technology to build a safer world, one step at a time.
              Discover our mission, our people, and our impact.
            </p>
          </div>

          {/* Mission & Vision Section */}
          <Section title="Our Mission & Vision">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <FaBullseye className="text-4xl text-primary mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To empower individuals with intelligent, real-time safety
                  assistance, providing peace of mind and fostering secure
                  communities through cutting-edge AI technology.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <FaEye className="text-4xl text-secondary mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To create a world where personal safety is a universal right,
                  not a luxury, by making proactive, AI-driven protection
                  accessible and seamlessly integrated into daily life.
                </p>
              </div>
            </div>
          </Section>

          {/* People's Stories Section */}
          <Section title="Stories from Our Community">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-2">
                  Loading stories...
                </p>
              ) : (
                stories.map((story) => <StoryCard key={story.id} story={story} />)
              )}
            </div>
          </Section>

          {/* Our Impact Section */}
          <Section
            title="Our Impact in Numbers"
            className="bg-white dark:bg-gray-800/50 rounded-2xl py-16 shadow-lg border border-gray-200 dark:border-gray-700 -mt-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-12">
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">
                  Loading stats...
                </p>
              ) : (
                impactData.map((stat) => {
                  const Icon = iconMap[stat.icon];
                  return Icon ? (
                    <ImpactCounter
                      key={stat.id}
                      icon={Icon}
                      end={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  ) : null;
                })
              )}
            </div>
          </Section>

          {/* Why Choose Us Section */}
          <Section title="Why Choose SafePathAI?">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">
                  Loading reasons...
                </p>
              ) : (
                whyChooseUsData.map((item) => {
                  const Icon = iconMap[item.icon];
                  return Icon ? (
                    <FeatureCard
                      key={item.id}
                      icon={Icon}
                      title={item.title}
                      description={item.description}
                    />
                  ) : null;
                })
              )}
            </div>
          </Section>

          {/* Workflow Section */}
          <Section title="How It Works">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">
                  Loading steps...
                </p>
              ) : (
                workflowData.map((step) => (
                  <WorkflowStepCard key={step.step} {...step} />
                ))
              )}
            </div>
          </Section>

          {/* Our Journey Timeline Section */}
          <Section title="Our Journey">
            <div className="relative container mx-auto px-6 flex flex-col space-y-8">
              <div className="absolute z-0 w-2 h-full bg-gradient-to-b from-primary/50 to-secondary/50 shadow-md inset-0 left-1/2 -translate-x-1"></div>
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Loading journey...
                </p>
              ) : (
                timelineData.map((item, index) => {
                  const Icon = iconMap[item.icon] || FaInfinity;
                  const isOdd = index % 2 !== 0;
                  const timelineItemClass = `timeline-item ${isOdd ? "flex-row-reverse" : ""
                    }`;
                  const timelineContentClass = `timeline-content ${isOdd ? "text-right" : ""
                    }`;
                  const iconBgClass = isOdd ? "bg-secondary" : "bg-primary";

                  return (
                    <div key={index} className="relative z-10">
                      <div className={timelineItemClass}>
                        <div className={`timeline-icon ${iconBgClass}`}>
                          <Icon className="text-white" size={20} />
                        </div>
                        <div className={timelineContentClass}>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {item.year}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Section>

          {/* Meet the Team Section */}
          <Section title="Meet the Innovators" className="text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-4">
                  Loading team...
                </p>
              ) : (
                teamData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))
              )}
            </div>
          </Section>

          {/* Get in Touch Section */}
          <section
            ref={contactRef}
            className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-700 ease-out ${isContactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Get in Touch
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Have a question, feedback, or a partnership inquiry? Our team is
                  ready to help. Reach out and let's make the world safer
                  together.
                </p>
                <div className="mt-8 flex space-x-4">
                  <a
                    href="https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <FaGithub className="grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/safepath-ai?_l=en_US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <FaLinkedin className="grayscale group-hover:grayscale-0 transition-all duration-300 text-[#0A66C2]" />
                  </a>
                  <a
                    href="https://x.com/safepath_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <FaTwitter className="grayscale group-hover:grayscale-0 transition-all duration-300 text-[#1DA1F2]" />
                  </a>
                </div>
              </div>
              <div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className={`space-y-5 transition-all duration-700 ease-out ${isContactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  style={{ transitionDelay: '150ms' }}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-transparent focus:ring-2 focus:ring-primary transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-transparent focus:ring-2 focus:ring-primary transition-all"
                  />
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-transparent focus:ring-2 focus:ring-primary transition-all"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Send Message <FaPaperPlane />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;