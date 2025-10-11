import { useState, useEffect } from "react";
import {
  FaBell,
  FaMapMarkerAlt,
  FaRobot,
  FaUsers,
} from "react-icons/fa";

interface SummaryCardsProps {
  alertsCount?: number;
  savedPlacesCount?: number;
  aiSuggestionsCount?: number;
  emergencyContactsCount?: number;
}

const SummaryCards = ({
  alertsCount = 0,
  savedPlacesCount = 0,
  aiSuggestionsCount = 0,
  emergencyContactsCount = 0
}: SummaryCardsProps) => {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    {
      icon: FaBell,
      title: "Active Alerts",
      value: alertsCount,
      color: "from-red-500 to-orange-500",
      bgLight: "bg-red-50",
      bgDark: "dark:bg-red-900/20",
      iconColor: "text-red-500 dark:text-red-400",
      description: "Safety alerts"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Saved Places",
      value: savedPlacesCount,
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-900/20",
      iconColor: "text-blue-500 dark:text-blue-400",
      description: "Favorite locations"
    },
    {
      icon: FaRobot,
      title: "AI Suggestions",
      value: aiSuggestionsCount,
      color: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-900/20",
      iconColor: "text-purple-500 dark:text-purple-400",
      description: "Smart recommendations"
    },
    {
      icon: FaUsers,
      title: "Emergency Contacts",
      value: emergencyContactsCount,
      color: "from-green-500 to-emerald-500",
      bgLight: "bg-green-50",
      bgDark: "dark:bg-green-900/20",
      iconColor: "text-green-500 dark:text-green-400",
      description: "Quick access contacts"
    }
  ];

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
    
    // Animate each card's value
    const targetValues = [alertsCount, savedPlacesCount, aiSuggestionsCount, emergencyContactsCount];
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      setAnimatedValues(targetValues.map(target => 
        Math.round(target * easeOutProgress)
      ));

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(targetValues);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [alertsCount, savedPlacesCount, aiSuggestionsCount, emergencyContactsCount]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`group relative overflow-hidden transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Glassmorphism Card with Enhanced Shadow */}
            <div className="relative p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-xl border border-white/40 dark:border-gray-700/40 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1),0_4px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_32px_-8px_rgba(0,0,0,0.15),0_12px_16px_-4px_rgba(0,0,0,0.08)] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 will-change-transform">
              
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 rounded-xl`}></div>
              
              {/* Icon Section */}
              <div className="relative flex items-center justify-between mb-4">
                <div className={`p-3 ${card.bgLight} ${card.bgDark} rounded-lg transition-all duration-500 shadow-sm ${
                  index === 0 ? 'group-hover:animate-[ring_0.5s_ease-in-out]' : 
                  index === 1 ? 'group-hover:animate-[bounce_0.6s_ease-in-out]' : 
                  index === 2 ? 'group-hover:animate-[pulse_0.8s_ease-in-out]' : 
                  'group-hover:scale-110'
                }`}>
                  <Icon className={`w-6 h-6 ${card.iconColor} transition-transform duration-500 ${
                    index === 3 ? 'group-hover:scale-125' : ''
                  }`} />
                </div>
              </div>
              
              {/* Custom keyframe animations */}
              <style>{`
                @keyframes ring {
                  0%, 100% { transform: rotate(0deg); }
                  10%, 30%, 50%, 70%, 90% { transform: rotate(-15deg); }
                  20%, 40%, 60%, 80% { transform: rotate(15deg); }
                }
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  25% { transform: translateY(-8px); }
                  50% { transform: translateY(0); }
                  75% { transform: translateY(-4px); }
                }
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  25% { transform: scale(1.1) rotate(5deg); }
                  50% { transform: scale(0.95) rotate(-5deg); }
                  75% { transform: scale(1.05) rotate(3deg); }
                }
              `}</style>

              {/* Content */}
              <div className="relative">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  {card.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white transition-all duration-300 group-hover:scale-105">
                    {animatedValues[index]}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {card.description}
                  </span>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-b-xl scale-x-0 group-hover:scale-x-100`}></div>
              
              {/* Shimmer Effect on Hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;