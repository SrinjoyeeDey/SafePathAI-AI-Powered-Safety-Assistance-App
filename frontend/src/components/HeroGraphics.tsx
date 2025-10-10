import Corner from "../assets/icons/Corner";
import LocationLight from "../assets/icons/LocationLight";
import LocationDark from "../assets/icons/LocationDark";

import SheildLinedLight from "../assets/icons/SheildLinedLight";
import SheildLinedDark from "../assets/icons/SheildLinedDark";

import SheildLight from "../assets/icons/SheildLight";
import SheildDark from "../assets/icons/SheildDark";
import PathLigth from "../assets/icons/PathLigth";
import PathDark from "../assets/icons/PathDark";

const HeroGraphics = () => {
  return (
    <div>
      {/* Graphics & background */}
      <div className="z-0">
        <LocationLight className="absolute lg:top-0 md:top-3 left-0 top-10 md:translate-x-0 translate-x-[-18%] md:opacity-50 opacity-30 w-56 lg:w-72 h-auto block dark:hidden" />
        <LocationLight className="absolute top-0 lg:right-[23%] right-[16%] lg:translate-y-[-12%] translate-y-[-10%] lg:w-58 w-52 h-auto md:opacity-50 opacity-30 sm:block hidden dark:hidden" />
        <LocationDark className="absolute lg:top-12 md:top-10 left-0 top-14 md:translate-x-[-36%] translate-x-[-42%] md:opacity-50 opacity-30 w-[46rem] lg:w-[56rem] h-auto hidden dark:block" />
        <LocationDark className="absolute top-0 lg:right-[7%] right-0 lg:translate-y-[-2%] lg:translate-x-0 translate-x-6 lg:w-[40rem] w-[38rem] h-auto md:opacity-50 opacity-30 dark:sm:block hidden dark:hidden" />

        <SheildLinedLight className="absolute lg:top-[4%] md:top-[10%] top-[4%] md:translate-x-0 translate-x-[17%] lg:left-[15%] md:left-[15%] lg:w-[50rem] h-auto w-[38rem] md:opacity-50 opacity-30 dark:hidden" />
        <SheildLinedDark className="absolute top-0 lg:translate-y-[-9%] md:translate-y-1  translate-y-[-9%] md:translate-x-[-29%] translate-x-[-10%] lg:left-[15%] md:left-[15%] lg:w-[46rem] h-auto w-[35rem] md:opacity-50 opacity-30 hidden dark:block" />

        <SheildLight className="absolute lg:top-[1rem] right-0 lg:translate-x-[16%] translate-x-[30%] md:opacity-50 opacity-30 xs:block hidden dark:hidden" />
        <SheildDark className="absolute w-[40rem] h-auto top-0 right-0 lg:translate-x-[23%] translate-x-[34%] lg:translate-y-[-8%] translate-y-[-10%] md:opacity-50 opacity-30 dark:xs:block hidden dark:hidden" />

        {/* walking along the path animation */}
        <PathLigth className="absolute md:top-[21rem] top-[24rem] sm:top-[18rem] lg:w-[84rem] w-[70rem] lg:translate-x-0 md:translate-x-[-20%] sm:translate-x-[-30%] translate-x-[-50%]  dark:hidden" />
        <PathDark className="absolute md:top-[21rem] top-[24rem] sm:top-[18rem] lg:w-[84rem] w-[70rem] lg:translate-x-0 md:translate-x-[-20%] sm:translate-x-[-30%] translate-x-[-50%]  dark:block hidden" />
      </div>

      <div className="absolute text-green-500 dark:text-secondary top-10 left-10 md:block hidden">
        <Corner />
      </div>
      <div className="absolute text-green-500 dark:text-secondary scale-x-[-1] scale-y-[-1] bottom-10 right-10 md:block hidden">
        <Corner />
      </div>
    </div>
  );
};

export default HeroGraphics;
