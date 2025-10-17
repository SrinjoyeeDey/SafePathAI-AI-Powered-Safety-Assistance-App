"use client";
import { Link } from "react-router-dom";
import HeroGraphics from "./HeroGraphics";

// Custom SVG icons to replace react-icons
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen relative px-6 max-w-full overflow-hidden">
      {/* Background graphics */}
      <HeroGraphics />

      <div className="flex flex-col items-center text-center md:pt-44 pt-32 relative z-10">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 shadow-sm absolute right-0 top-5"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          ) : (
            <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          )}
        </button>
        <div className="text-green-700 max-w-7xl mx-auto"></div>
        <div className="max-w-3xl flex flex-col items-center">
          <div className="flex gap-10">
            <div className="group w-fit h-fit md:block hidden">
              {/* Orb */}
              <div className="h-12 w-12 translate-y-[-4%] outline-1 bg-gradient-to-b from-[#33E4AF] via-[#8892D1] to-[#2D6EB8] rounded-full shadow-[0_0_25px_5px_rgba(51,228,175,0.6)] cursor-pointer transition hover:-translate-y-2"></div>
              {/* Message bubble */}
              <div className="absolute top-[20%] bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm rounded-lg px-4 py-3 opacity-0 group-hover:opacity-100 -translate-x-48 translate-y-5 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                Hi! I’m your AI safety assistant 👋
                {/* Tail */}
                <div className="absolute -bottom-1 right-5 w-3 h-3 bg-white dark:bg-gray-800 rotate-45"></div>
              </div>
            </div>
            <div className="rounded-full bg-green-400/20 text-green-700 p-2 px-4 w-fit dark:text-white dark:bg-secondary/30 flex gap-2 justify-center items-center mb-10">
              <ShieldIcon className="w-5 h-5" />
              Your safety Companion
            </div>
          </div>
          <h1 className="lg:text-6xl md:text-5xl text-4xl ">
            Stay
            <span className="text-green-500 dark:text-secondary">Safe</span>,
            wherever you go
          </h1>
          <div className="md:text-2xl text-xl pt-8 pb-10 font-normal text-gray-700 dark:text-white">
            Real-time safety monitoring and AI-powered route guidance for peace
            of mind anytime, anywhere.
          </div>
        </div>
        <div className=" flex md:flex-row flex-col lg:gap-8 gap-6">
          <Link
            to="/login"
            className="bg-green-500 dark:bg-secondary text-white p-3 px-14 rounded-xl hover:dark:bg-blue-600  transition hover:translate-y-1"
          >
            Get Started
          </Link>
          <Link
            to="/about-us"
            className="border-[0.5px] border-gray-400 p-3 px-14 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700  transition hover:translate-y-1"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
