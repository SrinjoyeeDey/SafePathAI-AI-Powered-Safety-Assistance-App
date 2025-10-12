"use client";
import { FaShieldAlt, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroGraphics from "./HeroGraphics";
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
            <FaSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          ) : (
            <FaMoon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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
              <FaShieldAlt />
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
