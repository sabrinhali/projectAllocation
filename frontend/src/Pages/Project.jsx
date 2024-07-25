import { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Project() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get("http://localhost:1000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:1000/project/delete/${id}`)
      .then((response) => {
        getAllProjects();
        alert("Project deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchHandle = (event) => {
    let key = event.target.value;
    if (key) {
      axios
        .get(`http://localhost:1000/project/data/${key}`)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllProjects();
    }
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-6 ml-0 md:ml-0">
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/addproject"
              className="bg-[lightblue] hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Add Project
            </Link>
            <form className="w-full ml-4">
              <input
                onChange={searchHandle}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search..."
              />
            </form>
          </div>

          <div className="overflow-y-auto">
            <table className="w-[60%px] divide-x divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Class Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Group Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Supervisor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Delete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.groupNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.technology}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.supervisor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button onClick={() => deleteProject(data._id)}>
                        <AiFillDelete
                          size="20px"
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500">
                      <Link to={`/projectUpdateForm/${data._id}`}>
                        <AiFillEdit className="text-2xl cursor-pointer hover:text-green-700" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
