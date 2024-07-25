import { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Users() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios
      .get("http://localhost:1000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:1000/user/delete/${id}`)
      .then((response) => {
        getAllUsers();
        alert("User deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchHandle = (event) => {
    let key = event.target.value;
    if (key) {
      axios
        .get(`http://localhost:1000/user/data/${key}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllUsers();
    }
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-6 ml-2">
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <form className="w-full">
              <input
                onChange={searchHandle}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Password
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
                {users.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.password}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button onClick={() => deleteUser(data._id)}>
                        <AiFillDelete
                          size="20px"
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500">
                      <Link to={`/userUpdateForm/${data._id}`}>
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

export default Users;
