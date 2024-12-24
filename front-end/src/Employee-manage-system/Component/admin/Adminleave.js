import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/adminleave.css";
import { Outlet } from "react-router-dom";

const Adminleave = () => {
  const [employee, setEmployee] = useState("");
  const [EmpDetails, setEmplDetails] = useState([""]);
  const [leave, setLeave] = useState(null);

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

  const handleapprove = () => {
    setEmployee((prev) => ({
      ...prev,
      leave: { LeaveReq: true, reason: prev.leave?.reason },
      days: {
        leaveday: prev?.days?.leaveday + 1 || 1,
      },
    }));
    setLeave("hello");
  };

  const handleleave = () => {
    setEmployee((prev) => ({
      ...prev,
      leave: { LeaveReq: false, reason: prev.leave?.reason },
    }));
    setLeave("hello");
  };

  useEffect(() => {
    if (leave !== null) {
      leavefetch();
    }
  }, [leave]);

  const leavefetch = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/employee/leave`,
        employee
      );
      if (res.data) {
        await empfetch();
        alert("success");
        setLeave(null);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="main-leave col-10 col-xl-12 ">
      <h2 className="mx-5 pt-3">Leave Request</h2>
      <div>
        <Outlet
          context={{
            EmpDetails,
            setEmployee,
            employee,
            handleapprove,
            handleleave,
          }}
        />
      </div>
    </div>
  );
};

export default Adminleave;
