import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import "../../CSS/admintask.css";

const Admintask = () => {
    const [EmplDetails, setEmplDetails] = useState([]);
    const [empltask, setEmpltask] = useState("");
    const [btn, setbtn] = useState("assign");
    const [assign, setAssign] = useState("assign");
    const [employeeid, setEmployeeid] = useState("");
    const [taskfield, setTaskfield] = useState("");

    const columns = [
        {
            name: "Employee",
            selector: (row) => row.name,
            cell: (row) => (
                <div className="profile-emp d-flex">
                    <span>
                        <img
                            src={`http://localhost:4000/uploads/${row.image}`}
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
            name: "Performance",
            selector: (row) => row.performance,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="position-change">
                    <button
                        className="btn btn-success border-success "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setAssign(row)}
                    >
                        Add task
                    </button>
                </div>
            ),
            width: "200px",
            ignoreRowClick: true,
        },
    ];

    const smallcolumn = [
        {
            name: "Employee",
            selector: (row) => row.name,
            cell: (row) => (
                <div className="profile-emp d-flex">
                    <span>
                        <img
                            src={`http://localhost:4000/uploads/${row.image}`}
                            alt="name"
                        />
                    </span>
                    <span>{row.name}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Position",
            selector: (row) => row.position,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="position-change">
                    <button
                        className="btn btn-success border-success "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setAssign(row)}
                    >
                        Add task
                    </button>
                </div>
            ),
            width: "200px",
            ignoreRowClick: true,
        },
    ];

    useEffect(() => {
        empfetch();
    }, []);

    const empfetch = async () => {
        const res = await axios.get("http://localhost:4000/employee/all");
        if (res.data) {
            setEmplDetails(res.data);
        } else {
            alert("admin data error");
        }
    };

    useEffect(() => {
        setEmpltask(
            EmplDetails.filter(
                (each) => each.position !== "reject" && each.position !== ""
            )
        );
    }, [EmplDetails]);

    // change employee assing and view

    useEffect(() => {
        employeechange();
    }, [btn]);

    const employeechange = () => {
        const newemployee = document.getElementById("as");
        const oldemployee = document.getElementById("ve");
        if (btn === "view") {
            newemployee.classList.remove("bg");
            oldemployee.classList.add("bg");
        } else {
            newemployee.classList.add("bg");
            oldemployee.classList.remove("bg");
        }
    };

    useEffect(() => {
        setEmployeeid(assign._id);
    }, [assign]);

    const handleassign = async () => {
        if (taskfield?.name !== "" && taskfield?.description !== "") {
            try {
                const res = await axios.post(
                    `http://localhost:4000/employee/task/${employeeid}`,
                    taskfield
                );
                if (res.data) {
                    alert("success");
                    setTaskfield("");
                    const input = document.getElementById("inpt");
                    const inputDes = document.getElementById("inptDes");
                    input.value = "";
                    inputDes.value = "";
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <div className="col-12 ">
            <div className=" d-flex align-item-center justify-content-around mt-2">
                <p id="as">
                    <Link to="/task">
                        <button
                            className="btn  text-dark"
                            onClick={() => setbtn("assign")}
                        >
                            Task_Assign
                        </button>
                    </Link>
                </p>
                <p id="ve">
                    <Link to="assign">
                        <button
                            className="btn  text-dark"
                            onClick={() => setbtn("view")}
                        >
                            Task_View
                        </button>
                    </Link>
                </p>
            </div>
            <div>
                <Outlet
                    context={{
                        columns,
                        empltask,
                        smallcolumn,
                        setTaskfield,
                        taskfield,
                        assign,
                        handleassign,
                        EmplDetails,
                    }}
                />
            </div>
        </div>
    );
};

export default Admintask;
