import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import { Employee } from "../login-register/context";
import "../CSS/Dashboard.css";
import axios from "axios";
// images
import daysimg from "../images/totatdays.jpg";
import leave from "../images/leave.jpg";
import present from "../images/presntdays.jpg";
import salaryimg from "../images/salary.jpg";
import deduction from "../images/deduction.jpg";
import current from "../images/current.jpg";
import { FaPerson, FaPhone } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const Dashboard = () => {
    const { person, setPerson, fetched, option } = useContext(Employee);
    const [admin, setAdmin] = useState("hi");

    // total cash
    const [show, setShow] = useState(false);

    // cash in hand
    const [show1, setShow1] = useState(false);

    // cashier
    const [cash, setCash] = useState("");
    // days
    const [days, setDays] = useState({
        totalday: 26,
        leaveday: 0,
    });

    useEffect(() => {
        setCash((prev) => ({
            ...prev,
            TotalSales: person?.cashier?.TotalSales || 0,
            cashInhand: person?.cashier?.cashInhand || 0,
            short: person?.cashier?.short || 0,
        }));
        setDays((prev) => ({
            ...prev,
            leaveday: person?.days?.leaveday || 0,
            presentday: days?.totalday - days?.leaveday,
        }));
    }, [person]);

    // admin details
    useEffect(() => {
        admindata();
    }, []);

    const admindata = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API}/admin/all`);
        if (res.data) {
            setAdmin(res.data);
            console.log(admin);
        } else {
            alert("admin data error");
        }
    };

    const addcash = async () => {
        if (show === true) {
            setShow(!show);
        }
        if (show1 === true) {
            setShow1(!show1);
        }

        setPerson((prev) => ({ ...prev, cashier: cash }));
    };

    useEffect(() => {
        fetched();
    }, []);

    const updatecash = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/employee/cashier`,
                person
            );
            if (res.data) {
                setPerson(res.data);
                setCash((prev) => ({
                    ...prev,
                    TotalSales: person.cashier.TotalSales,
                    cashInhand: person.cashier.cashInhand,
                    short: person.cashier.short,
                }));
                fetched();
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <div className="pages-top ">
                <div className="col-12 user-details ">
                    <div className="col-3 user-box d-none d-md-flex ">
                        <img
                            className="h-50 rounded"
                            src={`${person.image}`}
                            alt="user.name"
                        />
                        <div>
                            <div className="user-name">
                                <p>Name: </p>
                                <p>
                                    <span>{person.name}</span>
                                </p>
                            </div>
                            <div className="user-name">
                                <p>Id: </p>
                                <p>
                                    <span>{person.employeeid}</span>
                                </p>
                            </div>
                            <div className="user-name">
                                <p>Age: </p>
                                <p>
                                    <span>{person.age}</span>
                                </p>
                            </div>
                            <div className="user-name">
                                <p>phone: </p>
                                <p>
                                    <span>{person.phone}</span>
                                </p>
                            </div>

                            <div className="user-name">
                                <p>Position: </p>
                                <p>
                                    {" "}
                                    <span>
                                        {person.position === ""
                                            ? "Not Assigned"
                                            : person.position}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {person.position === "reject" ? (
                        <h1 className="text-danger m-auto">
                            {" "}
                            Sorry Your rejected !
                        </h1>
                    ) : (
                        <div className="emp-Details p-3 p-md-0 col-12 col-md-8">
                            <h2>
                                Welcome back,<br></br> {person.name}!
                            </h2>
                            <div className="admin">
                                <h3>your Manager Details</h3>
                                <p>
                                    <FaPerson />
                                    {admin.name}
                                </p>
                                <p>
                                    <FaPhone /> {admin.phone}
                                </p>
                                <p>
                                    <BiLogoGmail />
                                    {admin.email}
                                </p>
                            </div>
                            <div className=" col-12 days-cart">
                                <div className=" col-9 col-md-3 days-count ">
                                    <img src={daysimg} />
                                    <div>
                                        <h5>Total </h5>
                                        <p>{days.totalday}</p>
                                    </div>
                                </div>
                                <div className="col-9 col-md-3 days-count ">
                                    <img src={leave} />
                                    <div>
                                        <h5>Leave </h5>
                                        <p>{days.leaveday}</p>
                                    </div>
                                </div>
                                <div className="col-9 col-md-3 days-count ">
                                    <img src={present} />
                                    <div>
                                        <h5>Present </h5>
                                        <p>{days.totalday - days.leaveday}</p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className=" col-12 days-cart">
                                <div className=" col-9 col-md-3 days-count">
                                    <img src={salaryimg} />
                                    <div>
                                        <h5>salary </h5>
                                        <p>{person?.salary || 0}</p>
                                    </div>
                                </div>
                                <div className="col-9 col-md-3 days-count ">
                                    <img src={deduction} />
                                    <div>
                                        <h5>Deduction </h5>
                                        <p>
                                            {Math.round(
                                                (person.salary / 26) *
                                                    days.leaveday
                                            ) || 0}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-9 col-md-3 days-count ">
                                    <img src={current} />
                                    <div>
                                        <h5>current </h5>
                                        <p>
                                            {Math.round(
                                                person?.salary -
                                                    (person?.salary / 26) *
                                                        days.leaveday
                                            ) - (person?.cashier?.short || 0) || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h3>{person.position} </h3>

                            {person.position === "cashier" ? (
                                <section className="col-12">
                                    <h5 className="text-danger">
                                        Short:{person.cashier?.short}
                                    </h5>
                                    <div className="user-dashboard col-12 col-md-12">
                                        <div className="user-total col-10 col-md-3">
                                            <button
                                                className="btn btn-transparent fw-bold text-light"
                                                onClick={() => setShow(!show)}
                                            >
                                                Total Cash
                                            </button>
                                            <p>RS.{cash?.TotalSales || 0}</p>
                                            {show ? (
                                                <div className="cash-input ">
                                                    <input
                                                        type="number"
                                                        onChange={(e) => {
                                                            setCash((prev) => ({
                                                                ...prev,
                                                                TotalSales:
                                                                    e.target
                                                                        .value,
                                                            }));
                                                        }}
                                                    />
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={addcash}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="user-cash col-10 col-md-3">
                                            <button
                                                className="btn btn-transparent fw-bold text-light"
                                                onClick={() => setShow1(!show1)}
                                            >
                                                Hand Cash
                                            </button>
                                            <p>RS.{cash?.cashInhand || 0}</p>
                                            {show1 ? (
                                                <div className="cash-input ">
                                                    <input
                                                        type="number"
                                                        onChange={(e) => {
                                                            setCash((prev) => ({
                                                                ...prev,
                                                                cashInhand:
                                                                    e.target
                                                                        .value,
                                                            }));
                                                        }}
                                                    />
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={addcash}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="user-short col-10 col-md-5">
                                            <button className="btn btn-transparent fw-bold text-light">
                                                Short Cash
                                            </button>
                                            {person.cashier?.short !== 0 ? (
                                                <p>
                                                    Rs.{person.cashier?.short}
                                                </p>
                                            ) : (
                                                <p>Short in processing</p>
                                            )}
                                        </div>
                                    </div>
                                    <article className="text-center mt-3">
                                        <button
                                            className="btn btn-primary"
                                            onClick={updatecash}
                                        >
                                            Submit
                                        </button>
                                    </article>
                                </section>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
