import { Routes, Route } from "react-router-dom";
// import "./App.css";
import ProjectUpdateForm from "./Components/ProjectUpdateForm";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Sidenav from "./Components/Sidenav";
import AdminLogin from "./Pages/AdminLogin";
import AdminSignup from "./Pages/AdminSignup";
import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Project from "./Pages/Project";
import UserUpdateForm from "./Components/UserUpdateForm";
import ProjectTable from "./Pages/ProjectTable";
import AddProjectForm from "./Components/AddProjectForm";
import Notices from "./Pages/Notices";
import AddNotices from "./Components/AddNotices";
import PreferenceList from "./Pages/PreferenceList";
import NoticesUpdateForm from "./Components/NoticesUpdateForm";
import PreferenceListTable from "./Pages/preferenceListTable";
import NoticesTable from "./Pages/NoticesTable";

function App() {
  return (
    <>
      {/* pages */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<AdminLogin />}></Route>
        <Route path="/adminsignup" element={<AdminSignup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/project" element={<Project />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/projectTable" element={<ProjectTable />}></Route>
        <Route path="/noticesTable" element={<NoticesTable />}></Route>
        <Route
          path="/preferenceListTable"
          element={<PreferenceListTable />}
        ></Route>
        <Route path="/notices" element={<Notices />}></Route>
        <Route path="/preferenceList" element={<PreferenceList />}></Route>

        {/* components */}
        <Route path="/sidenav" element={<Sidenav />}></Route>
        <Route
          path="/projectUpdateForm/:id"
          element={<ProjectUpdateForm />}
        ></Route>
        <Route path="/userUpdateForm/:id" element={<UserUpdateForm />}></Route>
        <Route
          path="/noticesUpdateForm/:id"
          element={<NoticesUpdateForm />}
        ></Route>
        <Route path="/addproject" element={<AddProjectForm />}></Route>
        <Route path="/addnotices" element={<AddNotices />}></Route>
      </Routes>
    </>
  );
}

export default App;
