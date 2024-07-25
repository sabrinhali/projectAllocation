import { useState } from "react";
import Sidenav from "./Sidenav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Project = () => {
  const [className, setClassName] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [technology, setTechnology] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [mobile, setMobile] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const registerProject = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1000/register", {
        className,
        groupNumber,
        topic,
        technology,
        supervisor,
        mobile,
        year,
      })
      .then((Response) => {
        console.log(Response);
        alert("Project has been registered");
        navigate("/project");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="main flex-1 p-6 ml-1">
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Register New Project</h1>
          <form onSubmit={registerProject} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter class name"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter group number"
                required
                value={groupNumber}
                onChange={(e) => setGroupNumber(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter topic"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter technology"
                required
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter supervisor name"
                required
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter supervisor number"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter current year"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-700 transition-colors duration-200"
                type="submit"
              >
                Add Project
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Project;
