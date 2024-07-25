// import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post("http://localhost:1000/signup", {
        name: name,
        username: username,
        password: password,
      })
      .then((Response) => {
        console.log(Response);
        alert("datebase has been inserted");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex justify-center w-full h-screen bg-blue-500">
        <div className="w-96 h-[388px] p-6 shadow-lg bg-white rounded-md my-32">
          <h2 className="text-center block font-bold text-2xl mb-5">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label className="block text-base font-semibold">Name: </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="block text-base font-semibold">
                Username:{" "}
              </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="block text-base font-semibold">
                Passward:{" "}
              </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                type="text"
                placeholder="********"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="border-2 border-blue-500 bg-blue-500 text-white py-1 w-full rounded-md mt-5 hover:bg-transparent hover:text-blue-500 font-semibold"
              >
                Register
              </button>
            </div>
            <div className="m-4 text-center">
              <p className="">
                Already have an Account?{" "}
                <Link className="text-blue-500 text-[20px] ml-1" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
