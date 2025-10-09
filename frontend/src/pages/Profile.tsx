import React from "react";

// ✅ Custom Button matching design guide colors
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 
      bg-primary text-white hover:bg-green-600 
      dark:bg-primary dark:hover:bg-green-500 ${className}`}
  >
    {children}
  </button>
);

const Profile = ({ user }) => {
  const mockUser = user || {
    name: "Ambuj Vashistha",
    email: "ambuj@example.com",
    bio: "Full Stack Developer | React & Node.js Enthusiast",
    location: "India 🌍",
    profilePic:
      "https://avatars.githubusercontent.com/u/9919?s=280&v=4",
    status: "online",
    verified: true,
  };

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-primary text-white shadow-md">
        <h1 className="text-xl font-bold">My Profile</h1>
        <img
          src={mockUser.profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-white/30"
          title="Go to Profile"
        />
      </nav>

      {/* Profile Page */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center relative">
          
          {/* Profile Picture + Status */}
          <div className="relative">
            <img
              src={mockUser.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
            <span
              className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white 
                ${mockUser.status === "online" ? "bg-primary" : "bg-gray-400"}`}
            />
          </div>

          {/* Name + Verified */}
          <h1 className="mt-4 text-3xl font-bold flex items-center gap-2">
            {mockUser.name}
            {mockUser.verified && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </h1>

          {/* Email */}
          <p className="text-sm mt-1 text-text/70">{mockUser.email}</p>

          {/* Bio */}
          <p className="mt-3 text-text/80">{mockUser.bio}</p>

          {/* Location */}
          <p className="text-sm mt-2 text-text/60">📍 {mockUser.location}</p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button>Edit Profile</Button>
            <Button className="bg-secondary hover:bg-blue-600 dark:bg-secondary dark:hover:bg-blue-500">
              Settings
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
              Log Out
            </Button>
          </div>

          {/* Decorative glass-art effect */}
          <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/10 rounded-3xl -z-10 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
