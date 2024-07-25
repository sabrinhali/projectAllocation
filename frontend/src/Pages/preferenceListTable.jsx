import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../Components/Sidenav";
import { AiFillDelete } from "react-icons/ai";

const PreferenceListTable = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:1000/files");
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
      await axios.delete(`http://localhost:1000/files/${id}`);
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
        .get(`http://localhost:1000/files/data/${key}`)
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
            <form>
              <input
                onChange={searchHandle}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search..."
              />
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    ClassName
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    GroupNumber
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {file.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {file.groupNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a
                        href={`http://localhost:1000/${file.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View File
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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

export default PreferenceListTable;
