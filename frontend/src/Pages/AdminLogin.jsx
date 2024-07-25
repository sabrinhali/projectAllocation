import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:1000/admin/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.username) {
          //store admin data in localStorage
          localStorage.setItem("admin", JSON.stringify(response.data));
          navigate("/dashboard");
        } else {
          alert("username or password incorrect!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#783da3]">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-center text-2xl font-bold text-[#783da3] mb-2">
          Student Project Allocation System
        </h1>
        <h2 className="text-center text-3xl font-bold text-[#783da3] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-700">
              Username
            </label>
            <input
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#783da3] focus:border-transparent"
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
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#783da3] focus:border-transparent"
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-[#783da3] border border-[#783da3] rounded-md hover:bg-transparent hover:text-[#783da3] font-semibold transition-colors duration-200"
            >
              Login
            </button>
          </div>
          <div className="text-right">
            <Link
              className="text-[#783da3] font-semibold underline"
              to="/login"
            >
              Login as student
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
