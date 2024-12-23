import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "../../login-register/context";
import "../../CSS/task.css";
import { Link, Outlet } from "react-router-dom";

const Emptask = () => {
  const { person, fetched } = useContext(Employee);
  const [taskdata, setTaskdata] = useState([]);
  const [taskfield, setTaskfield] = useState([]);
  const [tabledata, setTabledata] = useState([]);

  const columns = [
    {
      name: "Taskname",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Status",
      cell: (row) => (
        <h5
          className="m-0"
          style={{
            color: `${
              row.status === "pending"
                ? "darkorange"
                : row.status === "doing"
                ? "blue"
                : row.status === "completed"
                ? "green"
                : "red"
            }`,
          }}
        >
          {row.status}
        </h5>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="position-change">
          {row.status === "doing" ? (
            ""
          ) : row.status === "completed" ? (
            ""
          ) : row.status === "stop" ? (
            ""
          ) : (
            <button
              className="btn btn-primary border-primary"
              onClick={() => handledoing(row._id)}
            >
              Doing
            </button>
          )}
          {row.status === "completed" ? (
            ""
          ) : row.status === "stop" ? (
            ""
          ) : (
            <button
              className="btn btn-success border-success"
              onClick={() => handlecomplete(row._id)}
            >
              Completed
            </button>
          )}
          {row.status === "stop" ? (
            <h4 className="text-danger">Pls do task Properly</h4>
          ) : (
            ""
          )}
        </div>
      ),
      allowOverflow: true,
      ignoreRowClick: true,
      width: "250px",
    },
  ];

  useEffect(() => {
    taskfetch();
  }, []);

  const taskfetch = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/employee/taskdetail`
    );
    if (res.data) {
      setTaskfield(res.data);
    }
  };

  useEffect(() => {
    const filter = taskfield.filter((item) => item.employeeid === person._id);
    setTaskdata(filter);
  }, [taskfield]);

  const handledoing = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/taskstatus/${id}`
      );
      if (res.data) {
        alert("success");
        taskfetch();
        setTabledata([]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handlecomplete = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/completed/${id}`
      );
      if (res.data) {
        alert("success");
        taskfetch();
        setTabledata([]);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetched();
  }, []);

  return (
    <div className="main-task">
      <h3 className="text-start mx-5 text-dark my-2">Task</h3>
      {person.position === "" && "reject" ? (
        <p style={{ color: "black" }}>You didnt Assigned for any position</p>
      ) : (
        <div className="col-12 d-flex align-items-center justify-content-center pt-1 mt-1">
          <div className="profile-cart col-8 mt-5">
            <div className="task-img d-none d-md-flex">
              <img
                src={`${process.env.REACT_APP_API}/uploads/${person.image}`}
                alt="name"
              />
            </div>

            <div className="task-img1  d-block d-md-none">
              <img
                src={`${process.env.REACT_APP_API}/uploads/${person.image}`}
                alt="name"
              />
            </div>
            <div className="taskemp-details text-start p-2">
              <h3>{person.name}</h3>
              <p>{person.position}</p>
              <p className="d-inline-flex gap-3">
                Performance{" "}
                <h5
                  style={{
                    color:
                      person.performance === 5
                        ? "darkgreen"
                        : person.performance === 0
                        ? "red"
                        : "blue",
                  }}
                >
                  {person.performance}
                </h5>
              </p>
              <p className="d-flex gap-3 flex-wrap">
                <button className="bg-warning text-light p-1 rounded-3 btn">
                  <Link to="pending" className="nav-link">
                    Pending{" "}
                    {
                      taskdata.filter((item) => item.status === "pending")
                        .length
                    }
                  </Link>
                </button>
                <button className="bg-danger text-light p-1 rounded-3 btn">
                  <Link to="timesup" className="nav-link">
                    Times Up{" "}
                    {taskdata.filter((item) => item.status === "stop").length}
                  </Link>
                </button>
                <button className="bg-primary text-light p-1 rounded-3 btn">
                  <Link to="doing" className="nav-link">
                    Doing{" "}
                    {taskdata.filter((item) => item.status === "doing").length}
                  </Link>
                </button>
                <button className="bg-success text-light p-1 rounded-3 btn">
                  <Link to="completed" className="nav-link">
                    Completed{" "}
                    {
                      taskdata.filter((item) => item.status === "completed")
                        .length
                    }
                  </Link>
                </button>
              </p>
            </div>
            <div></div>
          </div>
        </div>
      )}
      <h4 className="text-warning mt-2">
        Finish Task Before Times Up it will Affect Your Performance
      </h4>
      <div>
        <Outlet context={{ taskdata, columns, tabledata, setTabledata }} />
      </div>
    </div>
  );
};

export default Emptask;
