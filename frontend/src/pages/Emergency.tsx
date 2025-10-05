import SOSButton from "../components/SOSButton";

export default function Emergency() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-red-50 dark:from-gray-900 dark:to-red-950">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Emergency Assistance 🚨</h1>
      <p className="text-center max-w-md text-gray-700 dark:text-gray-300 mb-6">
        Press the SOS button below to send your live location to the emergency response system.
        Please ensure location access is enabled in your browser.
      </p>
      <SOSButton />
    </div>
  );
  
}
