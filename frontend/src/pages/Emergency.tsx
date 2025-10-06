"use client";
import SOSButton from "../components/SOSButton";

export default function Emergency() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-red-700 dark:text-red-400">
        Emergency Assistance
      </h1>
      <SOSButton />
      <p className="mt-6 text-gray-700 dark:text-gray-300 text-center px-4 max-w-md">
        Press the button below to immediately send your location to your trusted
        contacts marked as favorites.
      </p>
    </div>
  );
}
