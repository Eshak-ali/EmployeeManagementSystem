import React, { useContext } from "react";
import Navbar from "../../Navbar/navbar";
import { Employee } from "../../login-register/context";
import { BsBoxArrowInLeft, BsCart4 } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { person, setEmployee, setPerson, setPath, setAuthen } =
    useContext(Employee);

  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setPerson(null);
    setAuthen(false);
    setPath(null);
    setEmployee(null);
    navigate("/");
  };

  return (
    <div>
      <div className="main-admin row col-12  bg-secondary gx-0 p-2 p-md-0">
        <div className="col-12  p-0 d-md-none ">
          <Navbar />
        </div>
        <div className="col-3 col-xl-2 p-0 d-none d-md-flex admin-sidebar">
          <section>
            <h4 className="brand">
              Zara St<span>or</span>es <BsCart4 />
            </h4>
          </section>
          <section className="admin-details">
            <img
              className="profile-img"
              src={`${process.env.REACT_APP_API}/uploads/${person?.image}`}
              alt="image"
            />
            <h3>{person?.name}</h3>
            <button className="btn btn-transparent text-light">admin</button>
          </section>
          <section className="side-details">
            <ul className="list">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="employeeDetail">
                  Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="task">
                  Task_Assign
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="performance">
                  Performance
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="leave">
                  Notification
                </Link>
              </li>
              <li className="nav-item" onClick={handlelogout}>
                Logout <BsBoxArrowInLeft />
              </li>
            </ul>
          </section>
        </div>
        <div className="col-12 col-md-9 mt-4  p-0 text-start">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
