import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import "../../CSS/adminemployee.css";

const Adminsalary = () => {
    const [EmpDetails, setEmplDetails] = useState([]);
    const [pos, setPos] = useState();

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

    const columns = [
        {
            name: "Name",
            cell: (row) => (
                <div className="profile-emp d-flex ">
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
            width: "120px",
        },
        {
            name: "Id",
            selector: (row) => row.employeeid,
            sortable: true,
        },
        {
            name: "Leave Days",
            selector: (row) => row?.days?.leaveday || 0,
        },
        {
            name: "Salary",
            cell: (row) => (
                <span className="text-primary">{row?.salary || 0} </span>
            ),
        },
        {
            name: "Short",
            cell: (row) => (
                <div>
                    {row.position === "cashier" ? (
                        <span className="text-warning">
                            {row?.cashier?.short}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            ),
        },
        {
            name: "Leave Deduction",
            cell: (row) => (
                <span className="text-danger">
                    {Math.round((row.salary / 26) * row?.days?.leaveday) || 0}
                </span>
            ),
        },
        {
            name: "Current Salary",
            cell: (row) => (
                <div>
                    {row.position === "sales clerk" ? (
                        <span className="text-success">
                            {Math.round(
                                row.salary -
                                    (row.salary / 26) * row.days?.leaveday
                            ) || row.salary}
                        </span>
                    ) : (
                        <span className="text-success">
                            {Math.round(
                                row.salary -
                                    (row.salary / 26) * row.days?.leaveday
                            ) - row.cashier?.short || row.salary}{" "}
                        </span>
                    )}
                </div>
            ),
        },
    ];

    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    // seacrh
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

    return (
        <div className=" mx-md-5 col-10 col-xl-12 p-2">
            <h2 className="mx-5 pt-3 text-md-light">
                Employees Salary Package
            </h2>
            <div className=" my-2 d-flex align-items-center justify-content-around flex-wrap">
                <div className="d-none d-md-block">
                    <label>Search :</label>{" "}
                    <input
                        type="text"
                        role="searchbox"
                        onChange={(e) => handlesearch(e)}
                    />
                </div>
                <button className="btn btn-warning" onClick={reactToPrintFn}>
                    Generate document
                </button>
            </div>
            <div
                className=" table-responsive px-1 col-12 sal-table"
                ref={contentRef}
            >
                <DataTable
                    columns={columns}
                    data={pos}
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
};

export default Adminsalary;
