import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
// import { sessionStorage } from 'sessionStorage';

function Login({ handleLogin }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate({});
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  async function handleGetName() {
    try {
      const response = await axios.post(
        "http://localhost:8081/getName",
        values
      );
      const name = response.data[0].name.toString(); // Convert name to a string
      return name;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
      throw error; // Re-throw the error if needed
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            sessionStorage.setItem("email", values.email);
            sessionStorage.setItem("password", values.password);

            handleGetName()
              .then((name) => {
                console.log("Name:", name);
                sessionStorage.setItem("name", name);
              })
              .catch((error) => {
                console.error("Error:", error);
                // Handle any errors that occurred during the request
              });
            sessionStorage.setItem("loggedIn", true);
            navigate("/home");
          } else {
            alert("invalid login credentials");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex items-center justify-center py-28 bg-slate-800">
      <div className="px-3 py-3 bg-slate-400 w-1/4 font-serif rounded-lg">
        <div className="flex justify-content-center">
          <h2 className="font-siren font-bold text-slate-950">SignIn</h2>
        </div>

        <form onSubmit={handleSubmit}>
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
            <strong>Login</strong>
          </button>
          <p>You agree to our terms and conditions</p>
          <div className="flex w-full justify-content-center items-center">
            <Link
              to="/"
              className=" w-full text-center text-white h-full bg-blue-600 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-sm font-medium text-decoration-none duration-300"
            >
              <strong>Create Account</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
