import React, { useState, useEffect } from 'react';
import type { IconType } from 'react-icons';
import {
  FaBullseye, FaEye, FaUsers, FaBell, FaGlobe, FaPaperPlane, FaLinkedin, FaTwitter, FaGithub
} from 'react-icons/fa'; // FaRocket and FaInfinity were removed, adding them back
import { FaLightbulb, FaRocket, FaInfinity, FaShieldAlt, FaBrain, FaFirstAid } from 'react-icons/fa';
import type { TimelineItemData } from '../types/Timeline';
import type { TeamMemberData } from '../types/Team';
import type { StoryData } from '../types/Story';
import type { ImpactData } from '../types/Impact';
import type { WhyChooseUsData } from '../types/WhyChooseUs';
import type { WorkflowStepData } from '../types/Workflow';
import StoryCard from '../components/StoryCard';
import ImpactCounter from '../components/ImpactCounter';

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

const AboutUs: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamMemberData[]>([]);
  const [stories, setStories] = useState<StoryData[]>([]);
  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineItemData[]>([]);
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData[]>([]);
  const [workflowData, setWorkflowData] = useState<WorkflowStepData[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingImpact, setLoadingImpact] = useState(true);
  const [loadingTimeline, setLoadingTimeline] = useState(true);
  const [loadingWhy, setLoadingWhy] = useState(true);
  const [loadingWorkflow, setLoadingWorkflow] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/team.json').then((res) => res.json()),
      fetch('/data/stories.json').then((res) => res.json()),
      fetch('/data/impact.json').then((res) => res.json()),
      fetch('/data/timeline.json').then((res) => res.json()),
      fetch('/data/whychooseus.json').then((res) => res.json()),
      fetch('/data/workflow.json').then((res) => res.json()),
    ])
      .then(([team, storyData, impact, timeline, why, workflow]) => {
        setTeamData(team);
        setStories(storyData);
        setImpactData(impact);
        setTimelineData(timeline);
        setWhyChooseUsData(why);
        setWorkflowData(workflow);
      })
      .catch((err) => {
        console.error("Failed to fetch page data:", err);
      })
      .finally(() => {
        setLoadingTeam(false);
        setLoadingStories(false);
        setLoadingImpact(false);
        setLoadingTimeline(false);
        setLoadingWhy(false);
        setLoadingWorkflow(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About SafePathAI
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leveraging technology to build a safer world, one step at a time. Discover our mission, our people, and our impact.
          </p>
        </header>

        {/* Mission & Vision Section */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <FaBullseye className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To empower individuals with intelligent, real-time safety assistance, providing peace of mind and fostering secure communities through cutting-edge AI technology.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <FaEye className="text-4xl text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To create a world where personal safety is a universal right, not a luxury, by making proactive, AI-driven protection accessible and seamlessly integrated into daily life.
              </p>
            </div>
          </div>
        </section>

        {/* People's Stories Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Stories from Our Community</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {loadingStories ? (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-2">Loading stories...</p>
            ) : (
              stories.map(story => <StoryCard key={story.id} story={story} />)
            )}
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="mb-24 bg-white dark:bg-gray-800/50 rounded-2xl py-16 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Impact in Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {loadingImpact ? (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">Loading stats...</p>
            ) : (
              impactData.map(stat => {
                const Icon = iconMap[stat.icon];
                return Icon ? <ImpactCounter key={stat.id} icon={Icon} end={stat.value} suffix={stat.suffix} label={stat.label} /> : null;
              })
            )}
          </div>
        </section>

          {/* Why Choose Us Section */}
          <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose SafePathAI?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {loadingWhy ? (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">Loading reasons...</p>
            ) : (
              whyChooseUsData.map(item => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={item.id} className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    {Icon && <Icon className="text-4xl text-primary mx-auto mb-5" />}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Our Journey Timeline Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Journey</h2>
          <div className="relative container mx-auto px-6 flex flex-col space-y-8">
            <div className="absolute z-0 w-2 h-full bg-gradient-to-b from-primary/50 to-secondary/50 shadow-md inset-0 left-1/2 -translate-x-1"></div>
            {loadingTimeline ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading journey...</p>
            ) : (
              timelineData.map((item, index) => {
                const Icon = iconMap[item.icon] || FaInfinity;
                const isOdd = index % 2 !== 0;
                const timelineItemClass = `timeline-item ${isOdd ? 'flex-row-reverse' : ''}`;
                const timelineContentClass = `timeline-content ${isOdd ? 'text-right' : ''}`;
                const iconBgClass = isOdd ? 'bg-secondary' : 'bg-primary';

                return (
                  <div key={index} className="relative z-10">
                    <div className={timelineItemClass}>
                      <div className={`timeline-icon ${iconBgClass}`}><Icon className="text-white" size={20} /></div>
                      <div className={timelineContentClass}>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.year}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>



        {/* Workflow Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {loadingWorkflow ? (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-3">Loading steps...</p>
            ) : (
              workflowData.map(step => (
                <div key={step.step} className="relative p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-secondary/20 hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <div className="pt-8">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

          {/* Meet the Team Section */}
          <section className="mb-24 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Meet the Innovators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {loadingTeam ? (
              <p className="text-center text-gray-500 dark:text-gray-400 col-span-4">Loading team...</p>
            ) : (
              teamData.map((member) => (
                <div key={member.id} className="flex flex-col items-center space-y-3">
                  <img
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-110"
                    src={member.imageUrl}
                    alt={member.name}
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{member.name}</h4>
                    <p className="text-sm text-primary dark:text-secondary">{member.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>


        {/* Get in Touch Section */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Have a question, feedback, or a partnership inquiry? Our team is ready to help. Reach out and let's make the world safer together.
              </p>
              <div className="mt-8 flex space-x-4">
                <a href="https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"><FaGithub /></a>
                <a href="#" className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"><FaLinkedin /></a>
                <a href="#" className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"><FaTwitter /></a>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-transparent focus:ring-2 focus:ring-primary" />
              <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-transparent focus:ring-2 focus:ring-primary" />
              <textarea placeholder="Your Message" required rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-transparent focus:ring-2 focus:ring-primary"></textarea>
              <button type="submit" className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
