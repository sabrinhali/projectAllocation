import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidenav({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed transition-all duration-500 overflow-hidden h-screen bg-[#783da3] border-r-5 border-[#D8C4B6] ${
          isOpen ? "w-[50px]" : "w-[250px]"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-[#783da3]">
          <i
            onClick={toggleSidebar}
            className={`fa-solid ${
              isOpen ? "fa-bars" : "fa-xmark"
            } text-3xl text-white cursor-pointer`}
          ></i>
          {!isOpen && <h1 className="text-3xl text-white">Admin</h1>}
        </div>

        <div
          className={`flex flex-col gap-4 px-4 pt-4 text-xl ${
            isOpen ? "items-center" : "items-start"
          }`}
        >
          <NavLink
            to="/dashboard"
            className="text-white hover:bg-indigo-500 hover:p-2 hover:rounded-md flex items-center"
          >
            <i className="fa-brands fa-microsoft text-white"></i>
            {!isOpen && <span className="ml-2">Dashboard</span>}
          </NavLink>
          <NavLink
            to="/project"
            className="text-white hover:bg-indigo-500 hover:p-2 hover:rounded-md flex items-center"
          >
            <i className="fa-solid fa-book text-white"></i>
            {!isOpen && <span className="ml-2">Projects</span>}
          </NavLink>
          <NavLink
            to="/preferenceListTable"
            className="text-white hover:bg-indigo-500 hover:p-2 hover:rounded-md flex items-center"
          >
            <i className="fa-solid fa-file text-white"></i>
            {!isOpen && <span className="ml-2">Preference List</span>}
          </NavLink>
          <NavLink
            to="/notices"
            className="text-white hover:bg-indigo-500 hover:p-2 hover:rounded-md flex items-center"
          >
            <i className="fa-solid fa-envelope text-white"></i>
            {!isOpen && <span className="ml-2">Notices</span>}
          </NavLink>
          <NavLink
            to="/users"
            className="text-white hover:bg-indigo-500 hover:p-2 hover:rounded-md flex items-center"
          >
            <i className="fa-solid fa-users text-white"></i>
            {!isOpen && <span className="ml-2">Users</span>}
          </NavLink>
          <NavLink
            to="/"
            className="text-white hover:bg-indigo-500 hover:p-2 hover:rounded-md flex items-center"
          >
            <i className="fa-solid fa-right-from-bracket text-white"></i>
            {!isOpen && <span className="ml-2">Logout</span>}
          </NavLink>
        </div>
      </div>

      <div
        className={`main transition-all duration-500 ${
          isOpen ? "ml-[100px]" : "ml-[250px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Sidenav;
