"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SOSButton from "../components/SOSButton";
import EmergencySiren from "../components/EmergencySiren";
import { 
  Bell, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Shield,
  Volume2,
  Users,
  Zap,
  Info
} from "lucide-react";

export default function Emergency() {
  const [activeTab, setActiveTab] = useState<'siren' | 'sos'>('siren');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Emergency | SafePathAI";
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
              Emergency Assistance
            </h1>
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            Immediate help when you need it most
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-full p-2 shadow-lg border border-white/40 dark:border-gray-700/40">
            <button
              onClick={() => setActiveTab('siren')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'siren'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Emergency Siren</span>
            </button>
            <button
              onClick={() => setActiveTab('sos')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'sos'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>SOS Alert</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Emergency Action Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
              {activeTab === 'siren' ? (
                <>
                  <Bell className="text-red-600 dark:text-red-400" />
                  <span>Siren Alarm</span>
                </>
              ) : (
                <>
                  <Phone className="text-red-600 dark:text-red-400" />
                  <span>SOS Notification</span>
                </>
              )}
            </h2>

            {/* Content based on active tab */}
            {activeTab === 'siren' ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <EmergencySiren 
                    integrateWithSOS={true}
                    size="large"
                    floating={false}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>What happens when activated?</span>
                    </h3>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
                      <li>Plays loud emergency siren continuously</li>
                      <li>Activates phone vibration</li>
                      <li>Sends SOS alert to emergency contacts</li>
                      <li>Shares your current location</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                      ?? <strong>Emergency Use Only:</strong> This siren is designed to scare off threats and alert people nearby. Use responsibly.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <SOSButton />
                  
                  <p className="text-center text-gray-700 dark:text-gray-300 max-w-md">
                    Press the button to immediately send your location to your trusted contacts marked as favorites.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                      How SOS Works
                    </h3>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                      <li>Instantly shares your GPS coordinates</li>
                      <li>Sends notifications to all favorite contacts</li>
                      <li>Includes emergency message</li>
                      <li>No confirmation required - immediate action</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Information & Instructions Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            {/* Quick Tips */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Quick Tips</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  {
                    icon: Volume2,
                    title: "Volume Settings",
                    desc: "Ensure your device volume is up for maximum siren effectiveness"
                  },
                  {
                    icon: MapPin,
                    title: "Location Access",
                    desc: "Keep location services enabled for accurate emergency alerts"
                  },
                  {
                    icon: Users,
                    title: "Add Contacts",
                    desc: "Add trusted contacts to your favorites for emergency notifications"
                  },
                  {
                    icon: Zap,
                    title: "Quick Access",
                    desc: "Both siren and SOS work together for maximum safety"
                  }
                ].map((tip, idx) => {
                  const IconComponent = tip.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all"
                    >
                      <div className="flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {tip.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {tip.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Numbers */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span>Emergency Numbers</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: "Police", number: "100", color: "blue" },
                  { name: "Ambulance", number: "108", color: "red" },
                  { name: "Fire Service", number: "101", color: "orange" },
                  { name: "Women Helpline", number: "1091", color: "purple" }
                ].map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all"
                  >
                    <span className="font-medium text-gray-800 dark:text-white">
                      {service.name}
                    </span>
                    <a
                      href={`tel:${service.number}`}
                      className={`px-4 py-2 rounded-lg font-bold text-white transition-all hover:scale-105 ${
                        service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                        service.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                        service.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                        'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      {service.number}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Safety Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Your Safety Matters</h4>
                  <p className="text-sm text-white/90">
                    SafePathAI is here to protect you. In any threatening situation, don't hesitate 
                    to use these emergency features. Your well-being is our top priority.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}