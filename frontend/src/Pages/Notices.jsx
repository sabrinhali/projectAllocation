import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../Components/Sidenav";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const Notices = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:1000/notifications");
      setFiles(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/notifications/${id}`);
      alert("File deleted successfully");
      fetchFiles();
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    }
  };

  const searchHandle = (event) => {
    let key = event.target.value;
    if (key) {
      axios
        .get(`http://localhost:1000/notifications/data/${key}`)
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetchFiles();
    }
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-6 ml-1">
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/addNotices"
              className="bg-[lightblue] text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Notices
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <a
                        href={`http://localhost:1000/${file.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View File
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button onClick={() => handleDelete(file._id)}>
                        <AiFillDelete
                          size="20px"
                          className="text-red-500 hover:text-red-700"
                        />
                      </button>
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
};

export default Notices;
