import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "../../CSS/adminperformance.css";
import DataTable from "react-data-table-component";
import { useReactToPrint } from "react-to-print";

const Adminperformance = () => {
    const [employee, setEmployee] = useState("rated");
    const [EmpDetails, setEmplDetails] = useState([""]);
    const [perform, setPerform] = useState();

    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    // each employee
    const [emp, setEmp] = useState("");

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
        const filter = EmpDetails.filter((each) =>
            each.hasOwnProperty("performance")
        );
        setPerform(
            filter.filter(
                (each) => each.position !== "reject" && each.position !== ""
            )
        );
    }, [EmpDetails]);

    // table heading name
    const columns = [
        {
            name: "Employee",
            selector: (row) => row.name,
            cell: (row) => (
                <div className="profile-emp d-flex">
                    <span>
                        <img
                            src={`${row.image}`}
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
                        className="btn text-success border-success position"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                        onClick={() => setEmp(row)}
                    >
                        Edit Performance
                    </button>
                </div>
            ),
            width: "200px",
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ];

    const printcolumns = [
        {
            name: "Employee",
            selector: (row) => row.name,
            cell: (row) => (
                <div className="profile-emp d-flex">
                    <span>
                        <img
                            src={`${row.image}`}
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
    ];

    // change employee unrated and rated

    useEffect(() => {
        employeechange();
    }, []);

    useEffect(() => {
        employeechange();
    }, [employee]);

    const employeechange = () => {
        if (employee === "rated") {
            const filter = EmpDetails.filter((each) =>
                each.hasOwnProperty("performance")
            );
            setPerform(
                filter.filter(
                    (each) => each.position !== "reject" && each.position !== ""
                )
            );
        } else {
            const filter = EmpDetails.filter(
                (each) => !each.hasOwnProperty("performance")
            );
            setPerform(
                filter.filter(
                    (each) => each.position !== "reject" && each.position !== ""
                )
            );
        }
        const newemployee = document.getElementById("new-emp");
        const oldemployee = document.getElementById("old-emp");
        if (employee === "rated") {
            newemployee.classList.remove("border-line");
            oldemployee.classList.add("border-line");
        } else {
            newemployee.classList.add("border-line");
            oldemployee.classList.remove("border-line");
        }
    };

    const handleperformance = () => {
        performancefetch();
    };

    // search
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
        setPerform(filter);
    };

    const performancefetch = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/employee/performance`,
                emp
            );
            if (res.data) {
                await empfetch();
                alert("success");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="col-12 ">
            <h2 className="mx-3">
                Performance{" "}
                <div className="mt-4 text-end">
                    <button
                        className="btn btn-warning"
                        onClick={reactToPrintFn}
                    >
                        Generate document
                    </button>
                </div>
            </h2>
            <div>
                <p className="col-10 col-md-12 mx-4 mx-xl-5 mt-3 quotes">
                    Always treat Your employees exactly as you want them to
                    treat your best customers.
                </p>
            </div>
            <div className="col-10 col-md-6 m-auto">
                <ul className="empposition">
                    <li id="new-emp" className="nav-item">
                        <button
                            className="btn btn-transparent text-dark"
                            onClick={() => setEmployee("unrated")}
                        >
                            UnRated Employee
                        </button>
                    </li>
                    <li id="old-emp" className="nav-item">
                        <button
                            className="btn btn-transparent text-dark"
                            onClick={() => setEmployee("rated")}
                        >
                            Rated Employee
                        </button>
                    </li>
                </ul>
            </div>
            <div className="text-end mx-5">
                {" "}
                <input
                    type="text"
                    role="searchbox"
                    onChange={(e) => handlesearch(e)}
                />
            </div>

            <div
                style={{ width: "100%" }}
                className="data-table table-responsive mt-5 mx-xl-5 col-8 col-xl-12"
            >
                <DataTable
                    columns={columns}
                    data={perform}
                    pagination
                    highlightOnHover
                />
            </div>

            {/* position */}
            <div
                class="modal fade "
                id="exampleModal1"
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
                        <div class="modal-body rating-box ">
                            <label className="text-dark">Give Rating</label>
                            <input
                                type="number"
                                max={5}
                                min={1}
                                maxLength={1}
                                onChange={(e) =>
                                    setEmp((prev) => ({
                                        ...prev,
                                        performance: Number(e.target.value),
                                    }))
                                }
                            />
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
                                onClick={handleperformance}
                            >
                                Set
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}

            {/* genrate pdf */}
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog   modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5 text-dark text-bold"
                                id="exampleModalLabel"
                            >
                                PDF
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body w-100">
                            <div ref={contentRef}>
                                <DataTable
                                    columns={printcolumns}
                                    data={perform}
                                />
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
                                onClick={reactToPrintFn}
                            >
                                convert to pdf
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
        </div>
    );
};

export default Adminperformance;
