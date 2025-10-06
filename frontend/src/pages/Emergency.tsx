"use client";
import SOSButton from "../components/SOSButton";
import { motion } from "framer-motion";

export default function Emergency() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900"
    >
      <motion.h1
        className="text-4xl font-bold mb-8 text-red-700 dark:text-red-400"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Emergency Assistance
      </motion.h1>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SOSButton />
      </motion.div>
      <motion.p
        className="mt-6 text-gray-700 dark:text-gray-300 text-center px-4 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Press the button below to immediately send your location to your trusted
        contacts marked as favorites.
      </motion.p>
    </motion.div>
  );
}
