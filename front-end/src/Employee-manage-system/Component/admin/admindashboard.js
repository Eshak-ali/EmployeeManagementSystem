import React, { useContext, useEffect, useState } from "react";
import { BsBootstrapReboot, BsBoxArrowInLeft, BsCart4 } from "react-icons/bs";
import "../../CSS/admin.css";
import { Employee } from "../../login-register/context";
import axios from "axios";
import {
  FaBell,
  FaEllipsisVertical,
  FaPersonCircleCheck,
  FaPersonCircleQuestion,
  FaPersonCircleXmark,
  FaRegWindowMaximize,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Admindashboard = () => {
  const { employee, setEmployee, setTemp, temp, fetched, person } =
    useContext(Employee);

  const [empdetail, setEmpdetail] = useState([]);
  const [newemp, setNewemp] = useState([]);
  const [leave, setLeave] = useState([]);
  const [reg, setReg] = useState([]);
  const [rej, setRej] = useState([]);

  // notification
  const [bell, setBell] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  };
  const handleImage = (e) => {
    setTemp((prev) => ({ ...prev, image: e.target.files[0] }));
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
    formData.append("image", temp?.image || "");
    formData.append("position", temp?.position || "");

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
  };

  useEffect(() => {
    empfetch();
  }, []);

  const empfetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/employee/all`);
    if (res.data) {
      setEmpdetail(res.data);

      setBell(true);
    } else {
      alert("admin data error");
    }
  };

  useEffect(() => {
    setNewemp(empdetail.filter((each) => each.position === ""));
    setLeave(
      empdetail.filter((each) => each.leave && each.leave?.reason !== "")
    );
    setReg(
      empdetail.filter(
        (each) => (each.position !== "") & (each.position !== "reject")
      )
    );
    setRej(empdetail.filter((each) => each?.position === "reject"));
  }, [empdetail]);

  return (
    <div>
      <div>
        <div className="dashboard ">
          <h4 className=" mx-md-5" onClick={empfetch}>
            Dashboard <BsBootstrapReboot />
          </h4>
          <button
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop1"
            onClick={() => setTemp(person)}
            disabled={person}
          >
            Update-admin
          </button>
        </div>
        <section className="emp-register col-12   mx-xl-5">
          <div className="emp-cart text-light green">
            <h5>
              Register Employee <FaPersonCircleCheck />
            </h5>
            <p>{reg.length}</p>
          </div>
          <div className="emp-cart text-light blue">
            <h5>
              UnRegister Employee <FaPersonCircleQuestion />
            </h5>
            <p>{newemp.length}</p>
          </div>
          <div className="emp-cart text-light red">
            <h5>
              Rejected Employee <FaPersonCircleXmark />
            </h5>
            <p>{rej.length}</p>
          </div>
        </section>
        <section className="col-12 mx-5  mx-xl-5 d-none d-xl-flex newemp-cart">
          <div className="col-5 newemp-box ">
            <span>
              {" "}
              <h5 onClick={() => setBell(false)}>
                New Employees {bell === true ? <FaBell /> : ""}
              </h5>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#collapseWidthExample1"
                aria-expanded="false"
                aria-controls="collapseWidthExample"
              >
                <FaEllipsisVertical />
              </p>
            </span>

            <div className="absolute1" style={{ minHeight: `120px` }}>
              <div
                class="collapse collapse-horizontal"
                id="collapseWidthExample1"
              >
                <div
                  class="card card-body bg-light text-dark p-0"
                  style={{ width: "120px" }}
                >
                  <ul className="nav-link">
                    <li>
                      <h5>Menu</h5>
                    </li>
                    <li>
                      <p onClick={empfetch}>Refresh</p>
                    </li>
                    <li>
                      <Link className="nav-link" to="employeeDetail">
                        Maximize
                        <FaRegWindowMaximize />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="table-responsive emp-table">
              <table className="table table-bordered table-dark">
                <tbody>
                  {newemp.map((each) => (
                    <tr>
                      <td className="profile-emp">
                        <span>
                          <img
                            src={`${process.env.REACT_APP_API}/uploads/${each.image}`}
                          />
                          <p>{each.name}</p>
                        </span>
                      </td>
                      <td>
                        <p>{each.age}</p>
                      </td>
                      <td>
                        <p>{each.phone}</p>
                      </td>
                      <td>
                        <p>New register</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-5 newemp-box">
            <span>
              {" "}
              <h5 onClick={() => setBell(false)}>
                Messages{bell === true ? <FaBell /> : ""}
              </h5>
              <p
                data-bs-toggle="collapse"
                data-bs-target="#collapseWidthExample"
                aria-expanded="false"
                aria-controls="collapseWidthExample"
              >
                <FaEllipsisVertical />
              </p>
            </span>

            <div className="absolute" style={{ minHeight: `110px` }}>
              <div
                class="collapse collapse-horizontal"
                id="collapseWidthExample"
              >
                <div
                  class="card card-body p-0 bg-light text-dark"
                  style={{ width: "120px" }}
                >
                  <ul className="nav-link">
                    <li>
                      <h5>Menu</h5>
                    </li>
                    <li>
                      <p onClick={empfetch}>Refresh</p>
                    </li>
                    <li>
                      <Link className="nav-link" to="leave">
                        Maximize
                        <FaRegWindowMaximize />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="table-responsive emp-table">
              <table className="table table-bordered table-dark">
                <tbody>
                  {leave
                    .filter((each) => each.leave?.LeaveReq === null)
                    .map((each) => (
                      <tr>
                        <td className="profile-emp">
                          <span>
                            <img
                              src={`${process.env.REACT_APP_API}/uploads/${each.image}`}
                            />
                            <p>{each.name}</p>
                          </span>
                        </td>
                        <td>
                          <p>{each.leave?.reason}</p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop1"
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
                Hi {employee?.name}!
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
    </div>
  );
};

export default Admindashboard;
