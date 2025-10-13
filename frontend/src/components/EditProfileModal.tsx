import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profile updated: ${JSON.stringify(formData, null, 2)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <textarea
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                             hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-500 text-white 
                             hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}