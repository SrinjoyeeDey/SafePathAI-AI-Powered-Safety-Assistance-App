import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Corner from "../components/icons/Corner";

const Home = () => {
  return (
    <div className=" flex flex-col items-center md:h-[84vh] h-[76vh] text-center md:pt-44 pt-32 relative px-6">
  
      <div className="absolute text-green-500 dark:text-secondary top-10 left-10 md:block hidden">
        <Corner />
      </div>
      <div className="absolute text-green-500 dark:text-secondary transform scale-x-[-1] scale-y-[-1] bottom-10 right-10 md:block hidden">
        <Corner />
      </div>

      <div className="text-green-700 max-w-7xl mx-auto"></div>
      <div className="max-w-3xl flex flex-col items-center">
        <div className="rounded-full bg-green-400/20 text-green-700 p-2 px-4 w-fit dark:text-white dark:bg-secondary/30 flex gap-2 justify-center items-center mb-10">
          <FaShieldAlt />
          Your safety Companion
        </div>
        <h1 className="lg:text-6xl md:text-5xl text-4xl ">
          Stay <span className="text-green-500 dark:text-secondary">Safe</span>,
          wherever you go
        </h1>
        <div className="md:text-2xl text-xl pt-8 pb-10 font-normal text-gray-700 dark:text-white">
          Real-time safety monitoring and AI-powered route guidance for peace of
          mind anytime, anywhere.
        </div>
      </div>
      <div className=" flex md:flex-row flex-col lg:gap-8 gap-6">
        <Link
          to="/login"
          className="bg-green-500 dark:bg-secondary text-white p-3 px-14 rounded-xl"
        >
          Get Started
        </Link>
        <Link
          to="/about-us"
          className="border-[0.5px] border-gray-400 p-3 px-14 rounded-xl dark:bg-gray-800"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;
