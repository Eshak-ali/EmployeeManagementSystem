import React, { useContext, useEffect, useState } from "react";
import "../CSS/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Employee } from "./context";
import user from "../images/user.png";
import axios from "axios";

const Login = () => {
  console.log(process.env.REACT_APP_API);

  const [showicon, setShowicon] = useState(true);
  const { employee, setEmployee, setSign, sign, fetched } =
    useContext(Employee);
  const { check, setCheck } = useContext(Employee);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const hide = () => {
    setShowicon(!showicon);
    const input = document.getElementById("input");
    input.type = input.type === "text" ? "password" : "text";
  };

  const employeechk = (e) => {
    const { value } = e.target;
    const adm = document.getElementById("radio-adm");
    adm.checked = false;
    setCheck(value);
  };

  const adminchk = (e) => {
    const { value } = e.target;
    const emp = document.getElementById("radio-emp");
    emp.checked = false;
    setCheck(value);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (check === null) {
      alert("pls select your position");
    } else {
      if (check === "admin") {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/admin/login`,
            employee
          );
          if (res.data) {
            alert("login Successfully");
            fetched();
            navigate("/");
          }
        } catch (error) {
          alert("admin not found (invalid name or password)");
        }
      } else {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/employee/login`,
            employee
          );
          if (res.data) {
            alert("login succcessfully");
            fetched();
            navigate("/");
          }
        } catch (error) {
          alert("employee not found (invalid name or password)");
        }
      }
    }
  };
  return (
    <div className="main-login col-12">
        <div>
    <p>Admin: </p>
    <p>Zarastore, </p>
    <p>1511</p></div>
      <div className="login-box col-10 col-md-8">
        <div className="user-login">
          <img src={user} alt="user" />
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={handlesubmit}>
          <div className="form-name">
            <label>Name</label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={employee?.name}
              onChange={handlechange}
            />
          </div>
          <div className="form-name">
            <label>Password</label>
            <div className="p-inpt mr-5">
              <input
                id="input"
                className="input"
                type="password"
                name="password"
                onChange={handlechange}
              />
              <button
                type="button"
                className="eye-btn text-light"
                onClick={hide}
                style={{ cursor: "pointer" }}
              >
                {showicon ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="text-light user-chk">
            <div>
              <input
                id="check"
                type="checkbox"
                onChange={() => setSign(!sign)}
              />
              <label htmlFor="check">Keep me sign in</label>
            </div>
          </div>
          <div className="row  col-12 user-chk">
            <div className="col-4 col-md-6">
              <input
                id="radio-emp"
                type="radio"
                value="employee"
                placeholder="employee"
                onClick={employeechk}
              />
              <label htmlFor="radio-emp">Employee </label>
            </div>
            <div className="col-2 ">
              <input
                id="radio-adm"
                type="radio"
                value="admin"
                placeholder="employee"
                onClick={adminchk}
              />
              <label htmlFor="radio-adm">Admin</label>
            </div>
          </div>
          <button type="submit" className="btn btn-orange text-light">
            Login
          </button>
        </form>
        <p>
         Employee Don't have an Account pls<Link to={"/register"}> Register</Link>
       first!  </p>
      </div>
    </div>
  );
};
export default Login;
