import { useState, useEffect } from "react";
import axios from "axios";
import Sidenav from "../Components/Sidenav";
import { useNavigate } from "react-router-dom";

const AddNotices = () => {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("file", formData.file);

    try {
      await axios.post("http://localhost:1000/notification", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
      navigate("/notices");
      fetchFiles();
    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    }
  };

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

  return (
    <div className="flex">
      <Sidenav />
      <div className="main flex-1 p-6 ml-1">
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Add Notice</h1>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="file"
                name="file"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotices;
