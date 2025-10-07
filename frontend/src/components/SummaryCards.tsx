import {
  FaBell,
  FaMapMarkerAlt,
  FaRobot,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaExclamationCircle
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden"
          >
            {/* Glassmorphism Card */}
            <div className="relative p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform">
              
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Icon Section */}
              <div className="relative flex items-center justify-between mb-4">
                <div className={`p-3 ${card.bgLight} ${card.bgDark} rounded-xl transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {card.value}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {card.description}
                  </span>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
