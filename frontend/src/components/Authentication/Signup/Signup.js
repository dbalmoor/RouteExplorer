import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import Home from '../../Home/Home'

function Signup({ }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loggedIn = sessionStorage.getItem("loggedIn");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const validationErrors = await Validation(values);
    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        // If there are no errors, proceed with the login process
        await handleSignin();
      } catch (e) {
        console.error("Error:", e);
      }
    }
  };

  const handleSignin = async(e) => {
    try{
      await axios
        .post("http://localhost:8081/signup", values)
        .then(async (res) => {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("name", values.name);
          sessionStorage.setItem("email", values.email);
          sessionStorage.setItem("password", values.password);
          navigate("/home");
        })
        .catch((err) => console.log("Error: " + err));
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div>
      {loggedIn ? 
      <Home/>
      :
    <div className="flex items-center justify-center py-16 bg-slate-800">
      <div className="px-3 py-3 bg-slate-300 w-1/4 font-serif rounded-lg">
        <div className="flex justify-content-center">
          <h2 className="font-siren font-bold text-slate-950">SignUp</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
              name="name"
              onChange={handleInput}
              autoComplete="off"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
              onChange={handleInput}
              autoComplete="off"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              name="password"
              onChange={handleInput}
              autoComplete="off"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="text-white w-full h-full hover:bg-blue-600 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
          >
            <strong>Signup</strong>
          </button>

          <p>You agree to our terms and conditions</p>
          <div className="flex w-full justify-content-center items-center">
            <Link
              to="/login"
              className=" w-full text-center text-white h-full bg-blue-600 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
            >
              <strong>Login</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
}
    </div>
  );
}

export default Signup;
