import { useEffect, useState } from "react";
import Sidenav from "../Components/Sidenav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function userUpdateForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const getOneUser = () => {
    console.log(params.id);
    axios
      .get(`http://localhost:1000/user/${params.id}`)
      .then((response) => {
        setName(response.data[0].name);
        setUsername(response.data[0].username);
        setPassword(response.data[0].password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const updateUser = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:1000/user/update/${params.id}`, {
        name: name,
        username: username,
        password: password,
      })
      .then((response) => {
        alert("user updated successfully");
        navigate("/users");
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
          <h1>Update User</h1>

          <form>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />

            <button
              onClick={updateUser}
              className="button mt-5 bg-[#783da3] p-3 rounded-md text-white"
              type="submit"
            >
              {" "}
              Update User
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default userUpdateForm;
