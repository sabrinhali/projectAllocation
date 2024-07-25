import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PreferenceList = () => {
  const [formData, setFormData] = useState({
    className: "",
    groupNumber: "",
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
    data.append("className", formData.className);
    data.append("groupNumber", formData.groupNumber);
    data.append("file", formData.file);

    try {
      await axios.post("http://localhost:1000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Xogtaada waa la diiwaan galiyey");
      navigate("/home");
      fetchFiles();
    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    }
  };

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

  return (
    <div className="mx-[10%] my-20">
      <form
        onSubmit={handleUpload}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Class Name:
          </label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Group Number:
          </label>
          <input
            type="text"
            name="groupNumber"
            value={formData.groupNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            File
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferenceList;
