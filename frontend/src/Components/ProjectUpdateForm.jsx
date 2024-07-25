import { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function ProjectUpdateForm() {
  const [className, setClassName] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [technology, setTechnology] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [mobile, setMobile] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const getOneProject = () => {
    console.log(params.id);
    axios
      .get(`http://localhost:1000/project/${params.id}`)
      .then((response) => {
        setClassName(response.data[0].className);
        setGroupNumber(response.data[0].groupNumber);
        setTopic(response.data[0].topic);
        setTechnology(response.data[0].technology);
        setSupervisor(response.data[0].supervisor);
        setMobile(response.data[0].mobile);
        setYear(response.data[0].year);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOneProject();
  }, []);

  const updateProject = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:1000/project/update/${params.id}`, {
        className: className,
        groupNumber: groupNumber,
        topic: topic,
        technology: technology,
        supervisor: supervisor,
        mobile: mobile,
        year: year,
      })
      .then((response) => {
        alert("Project updated successfully");
        navigate("/project");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Sidenav />
      <div className="main">
        <div className="container">
          <h1>Update Project Form</h1>

          <form>
            <input
              type="text"
              placeholder="className"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="groupNumber"
              value={groupNumber}
              onChange={(e) => {
                setGroupNumber(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="technology"
              value={technology}
              onChange={(event) => {
                setTechnology(event.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="supervisor"
              value={supervisor}
              onChange={(event) => {
                setSupervisor(event.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="mobile"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="year"
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
              }}
            />
            <br />
            <button
              onClick={updateProject}
              className="button mt-5 bg-[#783da3] p-3 rounded-md text-white"
              type="submit"
            >
              {" "}
              Update Project
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ProjectUpdateForm;
