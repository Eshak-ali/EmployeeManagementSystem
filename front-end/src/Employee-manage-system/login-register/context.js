import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Employee = createContext();
const Context = ({ children }) => {
    // keep me sign in
    const [sign, setSign] = useState(false);

    // temporary for data update
    const [temp, setTemp] = useState("");

    // set empty value to the person
    const [person, setPerson] = useState(() => {
        const emp =
            localStorage.getItem("person") || sessionStorage.getItem("person");
        return emp ? JSON.parse(emp) : null;
    });

    // password and name find
    const [employee, setEmployee] = useState(() => {
        const emp =
            localStorage.getItem("employee") ||
            sessionStorage.getItem("employee");
        return emp ? JSON.parse(emp) : null;
    });

    // it is used to naviagte to another field in navbar
    const [option, setOption] = useState("");

    // it check employee or admin
    const [check, setCheck] = useState(() => {
        const chk =
            localStorage.getItem("check") || sessionStorage.getItem("check");
        return chk ? JSON.parse(chk) : null;
    });

    useEffect(() => {
        if (sign === true) {
            localStorage.setItem("check", JSON.stringify(check));
        } else {
            sessionStorage.setItem("check", JSON.stringify(check));
        }
    }, [check]);

    // path navigate to main page admin or employee
    const [path, setPath] = useState(null);

    // authen
    const [authen, setAuthen] = useState(false);
    // token
    const [authtoken, setAuthtoken] = useState(() => {
        const token =
            localStorage.getItem("authtoken") ||
            sessionStorage.getItem("authtoken");
        return token ? JSON.parse(token) : null;
    });

    useEffect(() => {
        if (authtoken) {
            setAuthen(true);
            setPath(check);
        }
    }, [authtoken]);

    // context functions
    const fetched = async () => {
        if (check === "employee") {
            try {
                const res = await axios.post(
                    "http://localhost:4000/employee/dashboard",
                    employee
                );
                if (res.data) {
                    setPerson(res.data);
                    if (sign === true) {
                        localStorage.setItem("person", JSON.stringify(person));
                    } else {
                        sessionStorage.setItem(
                            "person",
                            JSON.stringify(person)
                        );
                    }
                }
            } catch (error) {
                alert(error.message);
            }
        } else {
            try {
                const res = await axios.post(
                    "http://localhost:4000/admin/dashboard",
                    employee
                );
                if (res.data) {
                    setPerson(res.data);
                    if (sign === true) {
                        localStorage.setItem("person", JSON.stringify(person));
                    } else {
                        sessionStorage.setItem(
                            "person",
                            JSON.stringify(person)
                        );
                    }
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };

    // on change person state
    useEffect(() => {
        if (sign === true) {
            localStorage.setItem("person", JSON.stringify(person));
            localStorage.setItem("employee", JSON.stringify(employee));
            localStorage.setItem("check", JSON.stringify(check));
            setAuthtoken(person?._id);
        } else {
            sessionStorage.setItem("person", JSON.stringify(person));
            sessionStorage.setItem("employee", JSON.stringify(employee));
            sessionStorage.setItem("check", JSON.stringify(check));
            setAuthtoken(person?._id);
        }
    }, [person]);
    // ...

    return (
        <div>
            <Employee.Provider
                value={{
                    employee,
                    setEmployee,
                    option,
                    setOption,
                    check,
                    setCheck,
                    person,
                    setPerson,
                    fetched,
                    temp,
                    setTemp,
                    sign,
                    setSign,
                    authen,
                    setAuthen,
                    path,
                    setPath,
                }}
            >
                {children}
            </Employee.Provider>
        </div>
    );
};

export default Context;
