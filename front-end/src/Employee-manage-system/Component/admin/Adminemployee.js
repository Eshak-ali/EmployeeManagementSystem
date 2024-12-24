import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../../CSS/adminemployee.css";
import { Employee } from "../../login-register/context";
import { Link, Outlet } from "react-router-dom";

const Adminemployee = ({ setOption }) => {
  const [EmpDetails, setEmplDetails] = useState([""]);
  const [reject, setReject] = useState("reject");
  const [pos, setPos] = useState();
  const [employee, setEmployee] = useState("newemployee");
  const [use, setUse] = useState("");
  const [short, setShort] = useState();

  useEffect(() => {
    empfetch();
  }, []);

  const empfetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/employee/all`);
    if (res.data) {
      setEmplDetails(res.data);
    } else {
      alert("admin data error");
    }
  };

  useEffect(() => {
    setPos(
      EmpDetails.filter(
        (each) => each.position !== "reject" && each.position !== ""
      )
    );
  }, [EmpDetails]);

  const cash = async (each) => {
    setReject(each);
    setUse("hello");
  };

  useEffect(() => {
    if (use === "hello") {
      setReject((prev) => ({
        ...prev,
        cashier: {
          short:
            reject?.cashier?.short +
              (reject?.cashier?.TotalSales - reject?.cashier?.cashInhand) || 0,
          TotalSales: reject?.cashier?.TotalSales || 0,
          cashInhand: reject?.cashier?.cashInhand || 0,
        },
      }));
      setShort(reject?.cashier?.short);
    } else {
      setReject((prev) => ({
        ...prev,
        cashier: {
          short: short,
          TotalSales: reject?.cashier?.TotalSales || 0,
          cashInhand: reject?.cashier?.cashInhand || 0,
        },
      }));
    }
  }, [use]);

  // table heading name
  const columns = [
    {
      name: "Employee",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="profile-emp d-flex">
          <span>
            <img
              src={`${process.env.REACT_APP_API}/uploads/${row.image}`}
              alt="name"
            />
          </span>
          <span>{row.name}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Id",
      selector: (row) => row.employeeid,
      sortable: true,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: "cash handle",
      cell: (row) => (
        <div>
          {row.position === "cashier" ? (
            <button
              className="btn text-primary border-primary position"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => cash(row)}
            >
              checkout
            </button>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="position-change">
          <button
            className="btn text-danger border-danger reject"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalr"
            onClick={() => handlereject(row)}
          >
            Reject
          </button>
          <button
            className="btn text-success border-success position"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalp"
            onClick={() => setReject(row)}
          >
            Position
          </button>
        </div>
      ),
      width: "200px",
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  // change employee old and new
  useEffect(() => {
    employeechange();
  }, [employee]);

  const employeechange = () => {
    const newemployee = document.getElementById("new-emp");
    const oldemployee = document.getElementById("old-emp");
    if (employee === "oldemployee") {
      newemployee.classList.remove("border-line");
      oldemployee.classList.add("border-line");
    } else {
      newemployee.classList.add("border-line");
      oldemployee.classList.remove("border-line");
    }
  };

  const handlereject = (each) => {
    setReject(each);
    setReject((prev) => ({ ...prev, position: "reject" }));
  };

  const handleremove = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/position`,
        reject
      );
      if (res.data) {
        await empfetch();
      }
    } catch (error) {
      alert(error);
    }
  };

  // set position.

  const cashier = () => {
    const adm = document.getElementById("sales-clerk");
    adm.checked = false;
    setReject((prev) => ({ ...prev, position: "cashier", salary: 24000 }));
  };

  const sales = () => {
    const cashier = document.getElementById("cash-ier");
    cashier.checked = false;
    setReject((prev) => ({
      ...prev,
      position: "sales clerk",
      salary: 18000,
    }));
  };

  const setposition = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/position`,
        reject
      );
      if (res.data) {
        await empfetch();
        setPos(
          EmpDetails.filter(
            (each) => each.position !== "reject" && each.position !== ""
          )
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  // search
  const handlesearch = (e) => {
    const search = e.target.value;
    const filter = EmpDetails.filter(
      (each) => each.position !== "reject" && each.position !== ""
    ).filter(
      (each) =>
        each.name.toLowerCase().includes(search.toLowerCase()) ||
        each.employeeid.toString().includes(search.toLowerCase())
    );
    setPos(filter);
  };

  const handlecashier = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/cashier`,
        reject
      );
      if (res.data) {
        alert("success");
        empfetch();
        setUse("hello");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="col-12 main-adminemp text-dark p-2">
      <h2 className="mx-3">Employee Details</h2>
      <ul className="empposition mx-5">
        <li className="nav-item" id="new-emp">
          <button
            className="btn btn-transparent text-md-light"
            onClick={() => setEmployee("newemployee")}
          >
            New Employee
          </button>
        </li>
        <li className="nav-item" id="old-emp">
          <button
            className="btn btn-transparent text-md-light"
            onClick={() => setEmployee("oldemployee")}
          >
            Old Employee
          </button>
        </li>
        <li className="nav-item bg-success" onClick={() => setEmployee("")}>
          <Link className="nav-link" to="salary">
            Salary{" "}
          </Link>{" "}
        </li>
      </ul>
      {employee === "newemployee" ? (
        <>
          <h3 className="text-info mt-2 mx-5">New Employee</h3>
          <div className="table-responsive newemp mx-2 mx-md-5 col-11 col-md-10 col-xl-12">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Id</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Reject</th>
                  <th>Accept </th>
                </tr>
              </thead>
              <tbody>
                {EmpDetails.filter((each) => each.position === "").length ===
                0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        {" "}
                        <h1 className="text-danger text-center mx-5">
                          No Data
                        </h1>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  <>
                    {EmpDetails.filter((each) => each.position === "").map(
                      (each) => (
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
                            <p>{each.employeeid}</p>
                          </td>
                          <td>
                            <p>{each.phone}</p>
                          </td>
                          <td>
                            <p>{each.position}</p>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalr"
                              onClick={() => handlereject(each)}
                            >
                              Reject
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalp"
                              onClick={() => setReject(each)}
                            >
                              SetPosition
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : employee === "oldemployee" ? (
        <>
          <h3 className=" text-success  mx-5">Old Employee</h3>
          <ul className="empposition">
            <li id="cash-ier">
              <button
                className="btn btn-transparent text-dark"
                onClick={() =>
                  setPos(
                    EmpDetails.filter(
                      (each) =>
                        each.position !== "reject" && each.position !== ""
                    )
                  )
                }
              >
                All
              </button>
            </li>
            <li id="cash-ier">
              <button
                className="btn btn-transparent text-dark"
                onClick={() =>
                  setPos(
                    EmpDetails.filter((each) => each.position === "cashier")
                  )
                }
              >
                Cashier
              </button>
            </li>
            <li id="sales-clerk">
              <button
                className="btn btn-transparent text-dark"
                onClick={() =>
                  setPos(
                    EmpDetails.filter((each) => each.position === "sales clerk")
                  )
                }
              >
                Sales clerk
              </button>
            </li>
          </ul>

          <div id="carouselExample" class="carousel slide mt-5">
            <div class="carousel-inner">
              {EmpDetails.map(
                (each) => each.position !== "" && each.position !== "reject"
              ).length === 0 ? (
                <div class="carousel-item active">
                  <h1 className="text-center text-bold text-danger">No Data</h1>
                </div>
              ) : (
                <>
                  <div className="text-end mx-5">
                    {" "}
                    <input
                      type="text"
                      role="searchbox"
                      onChange={(e) => handlesearch(e)}
                    />
                  </div>
                  <div className="data-table mt-5 mx-4 table-responsive col-12 col-md-11 col-xl-12">
                    <DataTable
                      columns={columns}
                      data={pos}
                      pagination
                      highlightOnHover
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}

      {/* modal reject*/}
      <div
        class="modal fade index"
        id="exampleModalr"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">
                Conform Message
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-dark">
              Are you sure Do you want to remove {reject?.name}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleremove}
              >
                yes Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/* position set position */}
      <div
        class="modal fade index"
        id="exampleModalp"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-dark text-bold"
                id="exampleModalLabel"
              >
                Position
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ul className="text-center text-dark position-list">
                <li className="inner-list">
                  <input id="cash-ier" type="radio" onClick={cashier} />
                  cashier
                </li>
                <li className="inner-list">
                  <input id="sales-clerk" type="radio" onClick={sales} />
                  sales clerk
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn border-success text-success"
                data-bs-dismiss="modal"
                onClick={setposition}
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/* cashier checkout */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-dark text-bold"
                id="exampleModalLabel"
              >
                Check-Out💵
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setReject("")}
              ></button>
            </div>
            <div class="modal-body text-dark">
              <div className="cashier">
                <label>Total sales :</label>
                <span>{reject?.cashier?.TotalSales}</span>
              </div>
              <div className="cashier">
                <label>Cash in Hand :</label>
                <span>{reject?.cashier?.cashInhand}</span>
              </div>
              <div className="cashier">
                <label>Current short :</label>
                {use !== "clear" ? (
                  <span>
                    {reject?.cashier?.TotalSales - reject?.cashier?.cashInhand}
                  </span>
                ) : (
                  <span>0</span>
                )}
              </div>
              <div className="cashier">
                <label> this month short :</label>
                <span>{reject?.cashier?.short}</span>
              </div>
              <div>
                <button
                  className="btn btn-danger "
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  Clear Short
                </button>
              </div>

              <div style={{ minHeight: `100%` }}>
                <div
                  class="mt-2 collapse collapse-vertical"
                  id="collapseWidthExample"
                >
                  <div
                    class="card card-body p-2 bg-warning text-dark"
                    style={{ width: "100%" }}
                  >
                    <p>Do you want to clear Short for {reject.name}</p>
                    <div className="d-flex align-items-center justify-content-around mt-2">
                      <button
                        className="btn btn-success"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWidthExample"
                      >
                        No
                      </button>
                      <button
                        className="btn btn-danger"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWidthExample"
                        onClick={() => setUse("clear")}
                      >
                        yes clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn border-danger text-danger"
                data-bs-dismiss="modal"
                onClick={() => setReject("")}
              >
                Close
              </button>
              <button
                type="button"
                class="btn border-success text-success"
                data-bs-dismiss="modal"
                onClick={handlecashier}
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Adminemployee;
