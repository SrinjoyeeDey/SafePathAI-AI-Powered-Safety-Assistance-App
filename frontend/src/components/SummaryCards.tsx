import { useState } from 'react';

const SummaryCards = () => {
    const [metrics] = useState({
        alerts: 12,
        savedPlaces: 8,
        aiSuggestions: 5
    });

    // mock data
    const cards = [
        {
            id: 1,
            title: 'Active Alerts',
            value: metrics.alerts,
            icon: '🚨',
            description: 'Safety alerts in your area',
            gradient: 'from-red-50 to-red-100',
            iconBg: 'bg-red-100',
            textColor: 'text-red-600'
        },
        {
            id: 2,
            title: 'Saved Places',
            value: metrics.savedPlaces,
            icon: '📍',
            description: 'Your favorite locations',
            gradient: 'from-blue-50 to-blue-100',
            iconBg: 'bg-blue-100',
            textColor: 'text-blue-600'
        },
        {
            id: 3,
            title: 'AI Suggestions',
            value: metrics.aiSuggestions,
            icon: '🤖',
            description: 'Recent recommendations',
            gradient: 'from-green-50 to-green-100',
            iconBg: 'bg-green-100',
            textColor: 'text-green-600'
        }
    ];

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden group"
                        style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <div className={`bg-gradient-to-br ${card.gradient} p-6`}>
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                                >
                                    <span className="text-3xl">{card.icon}</span>
                                </div>
                            </div>
                            <div>
                                <p
                                    className={`text-5xl font-bold ${card.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}
                                >
                                    {card.value}
                                </p>
                                <h3 className="text-gray-700 font-semibold text-lg mb-1">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-green-400 transition-all duration-500"></div>
                    </div>
                ))}
            </div>

            <div
                className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100"
                style={{
                    animation: 'fadeInUp 0.6s ease-out 0.3s both'
                }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Recent <span style={{ color: '#32CD32' }}>Activity</span>
                    </h2>
                    <button className="text-sm font-medium hover:underline" style={{ color: '#32CD32' }}>
                        View All →
                    </button>
                </div>

                <div className="space-y-3">
                    {[
                        { icon: '🚨', title: 'New Alert', desc: 'High traffic detected on Main Street', time: '2m ago', color: 'red' },
                        { icon: '🤖', title: 'AI Suggestion', desc: 'Alternative route available via Route 45', time: '5m ago', color: 'green' },
                        { icon: '📍', title: 'Place Saved', desc: 'Central Park added to favorites', time: '1h ago', color: 'blue' }
                    ].map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all duration-300 transform hover:translate-x-2 cursor-pointer group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <span className="text-2xl">{activity.icon}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 group-hover:text-gray-900">
                                        {activity.title}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {activity.desc}
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium bg-white px-3 py-1 rounded-full">
                                {activity.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                style={{
                    animation: 'fadeInUp 0.6s ease-out 0.4s both'
                }}
            >
                <button
                    className="text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    style={{ backgroundColor: '#32CD32' }}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <span>View All Alerts</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </button>
                <button
                    className="text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    style={{ backgroundColor: '#1E90FF' }}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <span>Manage Places</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </button>
                <button
                    className="bg-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2"
                    style={{ borderColor: '#32CD32', color: '#32CD32' }}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <span>AI Insights</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </button>
            </div>

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default SummaryCards;