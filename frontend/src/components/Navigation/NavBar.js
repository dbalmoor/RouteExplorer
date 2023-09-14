import React, { useState } from "react";
import { TbBusStop } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../ChatbotComponent/config";
import MessageParser from "../ChatbotComponent/MessageParser";
import ActionProvider from "../ChatbotComponent/ActionProvider";

const NavBar = () => {
  const loggedIn = sessionStorage.getItem("loggedIn");
  const navigate = useNavigate();

  const [isUser, setUser] = useState(false);
  const [isChatBot, setChatBot] = useState(false);
  const displayUser = () => {
    setUser((prevState) => !prevState);
  };

  const handleUser = () => {
    displayUser();
  };

  const handleUserInfo = () => {
    displayUser();
    navigate("/home/UserInfo");
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleNavigateLogout = () => {
    displayUser();
    sessionStorage.clear();
    navigate("/");
  };

  const displayChatBot = () => {
    setChatBot((prevState) => !prevState);
  };
  return (
    <div className="max-w-screen-2xl h-auto flex-col">
      <div className=" mx-auto h-24 sticky top-0 z-50 bg-slate-800 flex justify-between items-center font-serif border-b-[1px] border-b-gray-600">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-3">
            <div className="flex">
              <span className=" text-white p-2">
                <TbBusStop className="w-8 h-8" />
              </span>
            </div>
            <div className="flex items-center">
              {loggedIn ? (
                <Link
                  to="/home"
                  className="text-white rounded-md font-bold font-serif text-decoration-none duration-300 text-xl"
                >
                  RouteExplorer
                </Link>
              ) : (
                <Link
                  to="/"
                  className="text-white rounded-md font-bold font-serif text-decoration-none duration-300 text-xl"
                >
                  RouteExplorer
                </Link>
              )}
            </div>
          </div>

          <div className="items-center">
            <ul className="flex gap-3 items-center">
              <li>
                {loggedIn ? (
                  <Link
                    to="/home"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                  >
                    Home
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                  >
                    Home
                  </Link>
                )}
              </li>
              <li>
                {loggedIn ? (
                  <a
                    href="#contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                  >
                    Contact
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                  >
                    Contact
                  </Link>
                )}
              </li>
              <li>
                <Link
                  onClick={displayChatBot}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                >
                  Help?
                </Link>
              </li>
              {loggedIn && (
                <li>
                  <button
                    onClick={handleUser}
                    className={`${
                      isUser && "text-red-600"
                    } text-gray-300 px-3 py-2 w-full h-full`}
                  >
                    <FaRegCircleUser className="w-full h-full" />
                  </button>
                </li>
              )}
              {!loggedIn && (
                <li>
                  <button
                    onClick={handleNavigateLogin}
                    className="text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                  >
                    Login
                  </button>
                </li>
              )}
              {!loggedIn && (
                <li>
                  <button
                    onClick={handleNavigateLogout}
                    className="text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
                  >
                    SignUp
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {isChatBot && (
        <div className="fixed flex flex-col h-auto right-3 bottom-3">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      {isUser && (
        <div
          className=" flex flex-col h-auto text-white w-40 absolute z-10 
        bg-slate-800 border-[1px] border-red-600 rounded right-16 justify-center items-center"
        >
          <div className="flex flex-col gap-3 py-3">
            <span
              className="flex flex-col cursor-pointer hover:text-red-600"
              onClick={handleUserInfo}
            >
              User Profile
            </span>
            <span className="flex border-[0.5px] border-red-600"></span>
            <span
              className="flex flex-col cursor-pointer hover:text-red-600"
              onClick={handleNavigateLogout}
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
