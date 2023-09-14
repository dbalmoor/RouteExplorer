import React from "react";
import Contact from "../Contact/Contact";
import { useNavigate } from "react-router-dom";
import FooterBottom from "../Footer/FooterBottom";

const Home = () => {

  const loggedIn=sessionStorage.getItem('loggedIn')
  const navigate = useNavigate();

  const handleNavigatePart1 = () => {
    navigate("/home/part1");
  };

  const handleNavigatePart2 = () => {
    navigate("/home/part2");
  };

  return (
    <div>
    {loggedIn && <div className="h-auto gap-5 flex flex-col">
      <div
        className="h-24 flex justify-center items-center bg-gray-800 font-serif border-b-[1px]
             border-b-gray-600 py-2"
      >
        <div className="font-serif font-semibold text-slate-300 text-2xl ">
          Welcome to{" "}
          <span className="font-serif text-white font-bold underline">
            RouteExplorer!
          </span>
        </div>
      </div>

      <div className=" flex justify-center items-center h-96">
        <div
          className="flex gap-y-5 flex-col rounded-xl shadow-lg w-1/2 text-white font-serif
              bg-slate-800 h-80 items-center justify-center hover:w-1/2 hover:h-96 transition-all
                duration-300 ease-in-out"
        >
          <div className="flex flex-col font-semibold text-2xl">
            <p>Are you looking for what bus to board?</p>
          </div>

          <div
            className="flex bg-white items-center  justify-center shadow-lg  rounded  
                     ease-in-out hover:w-40 hover:text-lg transition-all cursor-pointer"
          >
            <button
              className="bg-transparent h-10  text-gray-800 py-2 px-4 font-semibold border-none"
              onClick={handleNavigatePart1}
            >
              Get Started
            </button>
          </div>
        </div>
        <div
          className="flex gap-y-5 flex-col rounded-xl shadow-lg w-1/2 text-white font-serif
                 bg-slate-800 h-80 items-center justify-center hover:w-1/2 hover:h-96 transition-all
                  duration-300 ease-in-out"
        >
          <div className="flex flex-col font-semibold text-2xl">
            <p>Do you want to know the Route of your Bus?</p>
          </div>
          <div
            className="flex bg-white items-center  justify-center shadow-lg  rounded  
                     ease-in-out hover:w-40 hover:text-lg transition-all cursor-pointer"
          >
            <button
              className="bg-transparent h-10  text-gray-800 py-2 px-4 font-semibold border-none"
              onClick={handleNavigatePart2}
            > 
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div id="contact" className="flex flex-col">
        <Contact />
      </div>
      <div id="FooterBottom" className="flex flex-col">
        <FooterBottom />
      </div>
    </div>}
    </div>
  );
};

export default Home;
