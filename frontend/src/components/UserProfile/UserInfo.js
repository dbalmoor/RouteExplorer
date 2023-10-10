import React from "react";
import Contact from "../Contact/Contact";

const UserInfo = () => {
  const changePassword = () => {
    console.log("change password");
  };
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
              <button
                onClick={changePassword}
                className="flex justify-center items-center text-white w-full h-full hover:bg-gray-600 border-[1px] bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
              >
                <strong>CHANGE PASSWORD</strong>
              </button>
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
