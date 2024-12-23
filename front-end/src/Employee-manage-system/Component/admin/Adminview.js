import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../CSS/admintask.css";
import { FaPencil, FaStop, FaTrash } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import { useOutletContext } from "react-router-dom";

const Adminview = () => {
  const context = useOutletContext();
  const [taskfield, setTaskfield] = useState([]);
  const [taskemp, setTaskemp] = useState("");
  const [taskdata, setTaskdata] = useState();
  const [assign, setAssign] = useState("");
  const [chng, setchng] = useState("change");

  const columns = [
    {
      name: "Task name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "300px",
    },
    {
      name: "Status",
      cell: (row) => (
        <p
          className="m-0"
          style={{
            color: `${
              row.status === "pending"
                ? "red"
                : row.status === "doing"
                ? "blue"
                : "green"
            }`,
          }}
        >
          {row.status}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-3">
          <button
            style={{ width: "30px" }}
            className="btn text-primary  "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal3"
            onClick={() => setchng(row)}
          >
            <FaPencil />
          </button>
          <button
            style={{ width: "30px" }}
            className="btn text-danger  "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
            onClick={() => setAssign(row)}
          >
            <FaStop />
          </button>
          <button
            style={{ width: "30px" }}
            className="btn text-success  "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal4"
            onClick={() => setAssign(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: "200px",
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    setchng(assign);
    if (assign.status !== "stop") {
      setchng((prev) => ({ ...prev, status: "stop" }));
    }
  }, [assign]);

  const handlestop = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/taskstatus`,
        chng
      );
      if (res.data) {
        alert("Success");
        setTaskemp("");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handledelete = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/taskdelete/${id}`
      );
      if (res.data) {
        setTaskemp("");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    taskfetch();
  }, []);

  useEffect(() => {
    taskfetch();
    setTaskdata(
      taskfield.filter(
        (each) => each.employeeid === taskemp._id && each.status !== "stop"
      )
    );
  }, [taskemp]);

  const taskfetch = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/taskdetail`
    );
    if (res.data) {
      setTaskfield(res.data);
    }
  };

  return (
    <div className="main  my-md-2 mx-4 mx-md-5 col-10 col-xl-12 ">
      <div className="task-main-view">
        <label></label>
        <div class="dropdown">
          <button
            class="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Employees
          </button>
          <ul class="dropdown-menu emp-list">
            {context.EmplDetails.filter(
              (each) => each.position !== "reject" && each.position !== ""
            ).map((item) => (
              <li onClick={() => setTaskemp(item)}>
                <p className="dropdown-item profile-emp d-flex align-items-center justify-content-around">
                  {" "}
                  <img
                    src={`${process.env.REACT_APP_API}/uploads/${item.image}`}
                    alt="name"
                  />
                  <>{item.name}</>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {taskfield.filter((each) => each.employeeid === taskemp._id).length ===
      0 ? (
        <div className="emp-task">
          <h1>
            Task didn't assigned for{" "}
            <span className="text-danger">{taskemp.name}</span>
          </h1>
        </div>
      ) : (
        <div className="task-content mt-2">
          <div className="profile-task">
            {context.EmplDetails.filter((item) => item._id === taskemp._id).map(
              (item) => (
                <div className="d-flex align-items-center justify-content-start profile-emp gap-2">
                  <img
                    src={`${process.env.REACT_APP_API}/uploads/${item.image}`}
                    alt="name"
                  />
                  <h4 className="text-danger">{item.name}</h4>
                </div>
              )
            )}
          </div>
          <div className="table-responsive task-table">
            <DataTable
              columns={columns}
              data={taskdata}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      )}

      {/* task delete modal */}
      <div
        class="modal fade"
        id="exampleModal4"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog   ">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-dark text-bold"
                id="exampleModalLabel"
              >
                Assign-Task
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body w-100">
              <div>
                <h5>Do you want to delete this task</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn border-primary  text-primary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn border-danger  text-danger"
                data-bs-dismiss="modal"
                onClick={() => handledelete(assign)}
              >
                yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/* task stop */}
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog   ">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-dark text-bold"
                id="exampleModalLabel"
              >
                Assign-Task
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body w-100">
              <div>
                <h5>Do you want to stop this task</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn border-primary  text-primary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn border-danger  text-danger"
                data-bs-dismiss="modal"
                onClick={handlestop}
              >
                yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/* assign update */}
      <div
        class="modal fade"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog   ">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-dark text-bold"
                id="exampleModalLabel"
              >
                Assign-Task
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body w-100">
              <div>
                <h4 className="profile-emp text-dark ">Change Status</h4>
              </div>
              <div className="task-box">
                <form className="form">
                  <div className="form-details text-light">
                    <label>Task name</label>
                    <input
                      type="text"
                      value={chng.name}
                      onChange={(e) =>
                        setchng((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-details text-light">
                    <label>Description</label>
                    <textarea
                      type="text"
                      value={chng.description}
                      onChange={(e) =>
                        setchng((prev) => ({
                          ...prev,
                          description: e.target.value,
                          status: "pending",
                        }))
                      }
                    />
                  </div>
                </form>
              </div>
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
                onClick={handlestop}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};
export default Adminview;
