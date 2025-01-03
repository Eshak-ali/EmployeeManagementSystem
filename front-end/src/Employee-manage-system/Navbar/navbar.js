import React, { useContext, useEffect, useState } from "react";
import { BsBoxArrowInLeft, BsCart4, BsPerson } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import "../CSS/dashboardemp.css";
import { Employee } from "../login-register/context";
import axios from "axios";
import user from "../images/user.png";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    check,
    setPath,
    employee,
    setEmployee,
    person,
    setOption,
    setPerson,
    fetched,
    temp,
    setTemp,
    setAuthen,
  } = useContext(Employee);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  };
  const handleImage = (e) => {
    const file=e.target.files[0];
    setTemp((prev) => ({ ...prev, image: file}));
  };

  const updatestates = () => {
    setTemp(person);
    console.log(temp);
  };

  const update = async (temp) => {
    const formData = new FormData();
    formData.append("_id", temp._id);
    formData.append("name", temp.name);
    formData.append("age", temp?.age || "");
    formData.append("password", temp.password);
    formData.append("phone", temp?.phone || "");
    formData.append("email", temp?.email || "");
    formData.append("employeeid", temp?.employeeid || "");
    formData.append("image", temp?.image || person.image);
    formData.append("position", temp?.position || "");

    if (check === "employee") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/employee/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/formdata",
            },
          }
        );
        if (res.data) {
          alert("success");
          setEmployee(res.data);
          fetched();
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/admin/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/formdata",
            },
          }
        );
        if (res.data) {
          setEmployee(res.data);
          fetched();
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handlelogout = async () => {
    if (person.position === "reject") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/employee/delete/${person._id}`
        );
        if (res.data) {
          alert("Data cleared");
        } else {
          alert("some error occrs");
        }
      } catch (error) {
        alert(error);
      }
    }
    localStorage.clear();
    sessionStorage.clear();
    setPerson(null);
    setAuthen(false);
    setPath(null);
    setEmployee(null);
    navigate("/");
  };

  useEffect(() => {
    fetched();
  }, [employee]);

  return (
    <div className="text-light bg-body">
      <div className="nav-bar p-5 ">
        <p
          className="side-bar bar-icon"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <FaBars />
        </p>
        <h2 className="brand">
          Zara St<span>or</span>es <BsCart4 />
        </h2>
        <div className="user-logout d-none d-md-flex">
          <div className="user">
            <p>
              <BsPerson />
            </p>
            <p>{person.name}</p>
          </div>
          <button
            className="btn mb-3 text-light btn-danger"
            onClick={handlelogout}
          >
            Log-out <BsBoxArrowInLeft />
          </button>
        </div>
      </div>
      <div
        class="offcanvas offcanvas-start side-bar-menu text-light"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header company">
          <button
            type="button"
            className="btn side-bar-btn text-light"
            data-bs-dismiss="offcanvas"
          >
            <FaBars />
          </button>
          <div className="nav-brand">
            <h5 classname="offcanvas-title" id="offcanvasScrollingLabel">
              <span className="brand">
                Zara St<span>or</span>es
              </span>
            </h5>
            <p>
              <BsCart4 />
            </p>
          </div>
        </div>

        <div class="offcanvas-body">
          {check === "employee" ? (
            <>
              <ul className="nav-list employee-list">
                <li
                  className="nav-item profile-name"
                  data-bs-dismiss="offcanvas"
                  onClick={() => setOption("")}
                >
                  <img
                    className="profile-img"
                    src={
                      `${process.env.REACT_APP_API}/uploads/${person.image}` ||
                      user
                    }
                    alt="name"
                  />
                  <p>{person.name}</p>
                  <br />
                  <p>Id:{person.employeeid}</p>
                </li>
                <Link className="nav-link" to="/">
                  {" "}
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    Dashboard
                  </li>
                </Link>
                <Link className="nav-link" to="performance">
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    Performance
                  </li>
                </Link>
                <Link className="nav-link" to="emptask">
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    Task
                  </li>
                </Link>
                <Link className="nav-link" to="leave">
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    {" "}
                    Leaverequest
                  </li>
                </Link>

                <li className="update">
                  <button
                    className="btn btn-primary"
                    onClick={updatestates}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={handlelogout}>
                    Logout <BsBoxArrowInLeft />
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <ul className="nav-list employee-list">
              <li className="nav-item profile-name" data-bs-dismiss="offcanvas">
                <img
                  className="profile-img"
                  src={
                    `${process.env.REACT_APP_API}/uploads/${person.image}` ||
                    user
                  }
                  alt="name"
                />
                <p>{person.name}</p>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" to="employeeDetail">
                  Employees
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" to="task">
                  Task_Assign
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" to="performance">
                  Performance
                </Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link" to="leave">
                  Notification
                </Link>
              </li>
              <li className="update" data-bs-dismiss="offcanvas">
                <button
                  className="btn btn-primary"
                  onClick={updatestates}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Update
                </button>
                <button className="btn btn-danger" onClick={handlelogout}>
                  Logout <BsBoxArrowInLeft />
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">
                Hi {person.name}!
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body bg-success ">
              <div class="modal-form">
                <div class="form-box">
                  <form class="update-box">
                    <label>Name </label>
                    <input
                      type="text"
                      name="name"
                      value={temp.name}
                      onChange={handlechange}
                    />
                    <label>Age </label>
                    <input
                      type="number"
                      name="age"
                      value={temp.age}
                      onChange={handlechange}
                    />
                    <label>Password </label>
                    <input
                      type="password"
                      name="password"
                      value={temp.password}
                      onChange={handlechange}
                    />
                    <label>Phone </label>
                    <input
                      type="number"
                      name="phone"
                      value={temp.phone}
                      onChange={handlechange}
                    />
                    <label>Email </label>
                    <input
                      type="text"
                      name="email"
                      value={temp.email}
                      onChange={handlechange}
                    />
                    <label></label>
                    <input
                      type="file"
                      className="file-input"
                      accept="image/*"
                      onChange={handleImage}
                      disabled
                    />
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => update(temp)}
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-auto">
        {check !== "employee" ? "" : <Outlet />}
      </div>
    </div>
  );
};
export default Navbar;
