// import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);

  let handlleOpen = () => {
    setisOpen(true);
  };

  let handleClose = () => {
    setisOpen(false);
  };
  return (
    <>
      <div className="w-[100%] h-[90px] bg-[#783da3]">
        <div className="flex justify-around">
          <h1 className="text-white py-3 text-4xl text-center">Online</h1>
          <i
            style={{ display: isOpen == true ? "none" : "" }}
            onClick={handlleOpen}
            className="fa-solid fa-bars text-white absolute right-0 top-6 mr-4 text-2xl sm:hidden"
          ></i>
          <i
            style={{ display: isOpen == true ? "block" : "none" }}
            onClick={handleClose}
            className="fa-solid fa-xmark  text-white absolute right-0 top-6 mr-4 text-2xl sm:hidden"
          ></i>
        </div>

        {/* Start Page starts here */}
      </div>
      <div className="flex justify-center w-full h-screen">
        <div className="w-96 h-[300px] p-6 shadow-slate-500 bg-white rounded-md my-32 ">
          <div className="mt-10">
            <button
              type="submit"
              className="border-2 border-[#783da3] bg-[#783da3] text-white py-1 w-full rounded-md mt-4 hover:bg-transparent hover:text-[#783da3] font-semibold"
            >
              <Link to="/adminlogin">Login as Admin</Link>
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="border-2 border-blue-500 bg-blue-500 text-white py-1 w-full rounded-md mt-4 hover:bg-transparent hover:text-blue-500 font-semibold"
            >
              <Link to="/login">Login as Student</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
