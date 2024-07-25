import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectTable = () => {
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
    <>
      <div className="">
        {/* Back Button */}
        <div className="flex justify-end gap-3 mr-8 mt-6">
          <Link
            to="/home"
            className="bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-md text-white"
          >
            Back
          </Link>
        </div>

        {/* Form */}
        <div className="mx-4 my-5">
          <div className="container mx-auto bg-gray-100 p-4">
            <div className="form mb-5">
              <form>
                <textarea
                  onChange={searchHandle}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Search..."
                />
              </form>
            </div>

            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ClassName
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Group Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Topic
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Technology
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Supervisor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Mobile
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Year
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.map((data, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.className}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.groupNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.topic}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.technology}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.supervisor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.mobile}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border-t">
                            {data.year}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTable;
