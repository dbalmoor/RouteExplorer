import React from "react";
import Contact from "../Contact/Contact";

const UserInfo = () => {
  const password = sessionStorage.getItem("password");
  return (
    <div className="text-white font-serif h-auto flex flex-col items-center justify-center bg-gray-800">
      <div className="pt-5 flex flex-col h-auto w-full items-center justify-center">
        <div className="bg-gray-700 flex flex-col top-9 py-5 h-auto w-1/3 gap-3 rounded-md">
          <div className="flex items-center justify-center ">
            <span className="text-3xl font-serif text-white">User Profile</span>
          </div>
          <div className="flex flex-col p-5 ">
            <div className="flex gap-2">
              <p className="flex text-xl font-serif text-gray-100">
                User Name:
              </p>
              <span className="flex text-lg font-serif text-gray-400">
                {sessionStorage.getItem("name")}
              </span>
            </div>
            <div className="flex gap-2">
              <p className="flex text-xl font-serif text-gray-100">Mail Id:</p>
              <span className="flex text-lg font-serif text-gray-400">
                {sessionStorage.getItem("email")}
              </span>
            </div>
            <div className="flex gap-2">
              <p className="flex text-xl font-serif text-gray-100">Password:</p>
              <span className="text-lg font-serif text-gray-400 hidden">
                {sessionStorage.getItem("password")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="pt-5 w-full">
        <Contact />
      </div>
    </div>
  );
};

export default UserInfo;
