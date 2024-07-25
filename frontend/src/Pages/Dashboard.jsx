import { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [totalProjects, setTotalProjects] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [totalFiles, setTotalFiles] = useState("");

  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");

  const protectRoute = () => {
    if (!admin) {
      navigate("/");
    }
  };

  useEffect(() => {
    protectRoute();
  }, [admin, navigate]);

  // Fetch data
  useEffect(() => {
    const getTotalProjects = async () => {
      const response = await axios.get("http://localhost:1000/total/projects");
      setTotalProjects(response.data.totalProjects);
    };

    const getTotalUsers = async () => {
      const response = await axios.get("http://localhost:1000/total/users");
      setTotalUsers(response.data.totalUsers);
    };

    const getTotalFiles = async () => {
      const response = await axios.get("http://localhost:1000/total/files");
      setTotalFiles(response.data.totalFiles);
    };

    getTotalProjects();
    getTotalUsers();
    getTotalFiles();
  }, []);

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-5">
          <div className="w-full sm:w-[300px] h-[200px] bg-[#F6F2DD] border-b-8 border-blue-500 rounded text-center p-4">
            <h1 className="text-xl font-bold">Total Projects</h1>
            <h1 className="mt-5 text-3xl font-semibold text-blue-500">
              {totalProjects}
            </h1>
          </div>
          <div className="w-full sm:w-[300px] h-[200px] bg-[#F6F2DD] border-b-8 border-orange-500 rounded text-center p-4">
            <h1 className="text-xl font-bold">Total Users</h1>
            <h1 className="mt-5 text-3xl font-semibold text-orange-500">
              {totalUsers}
            </h1>
          </div>
          <div className="w-full sm:w-[300px] h-[200px] bg-[#F6F2DD] border-b-8 border-green-500 rounded text-center p-4">
            <h1 className="text-xl font-bold">Preference List Uploads</h1>
            <h1 className="mt-5 text-3xl font-semibold text-green-500">
              {totalFiles}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
