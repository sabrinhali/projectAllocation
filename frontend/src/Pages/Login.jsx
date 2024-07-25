import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:1000/signup/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.username) {
          //store admin data in localStorage
          localStorage.setItem("admin", JSON.stringify(response.data));
          navigate("/home");
        } else {
          alert("Username or password incorrect!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-center text-3xl font-bold text-blue-500 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-700">
              Username
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700">
              Password
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-transparent hover:text-blue-500 font-semibold transition-colors duration-200"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p>
              New Here?{" "}
              <Link className="text-blue-500 underline" to="/signup">
                Create an Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
