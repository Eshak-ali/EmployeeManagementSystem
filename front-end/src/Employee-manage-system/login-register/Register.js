import React, { useContext } from "react";
import "../CSS/register.css";
import { Link, useNavigate } from "react-router-dom";
import { Employee } from "./context";
import user from "../images/user.png";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const { employee, setEmployee } = useContext(Employee);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value.trim(" ") }));
        let b = "";
        for (let i = 0; i < 8; i++) {
            const a = Math.floor(Math.random() * 9);
            b = b + a.toString();
        }
        setEmployee((prev) => ({ ...prev, employeeid: b }));
        setEmployee((prev) => ({ ...prev, position: "" }));
    };

    const handleimage = (e) => {
        setEmployee((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handlesubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", employee.name);
        formData.append("age", employee.age);
        formData.append("password", employee.password);
        formData.append("phone", employee.phone);
        formData.append("email", employee.email);
        formData.append("employeeid", employee.employeeid);
        formData.append("image", employee.image);
        formData.append("position", employee.position);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/employee`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data) {
                alert("register successfully");
                setEmployee({
                    name: "",
                    age: "",
                    passowrd: "",
                    phone: "",
                    email: "",
                    image: "",
                    position: "",
                });
                navigate("/");
            } else {
                console.log("regsiter not successfull");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="main-reg col-12">
            <div className="reg-box col-12 col-md-8">
                <div className="user-login">
                    <img src={user} alt="user" />
                    <h1>Register</h1>
                </div>
                <form className="reg-form" onSubmit={handlesubmit}>
                    <div className="reg-input">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employee?.name}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="reg-input">
                        <label>Age</label>
                        <input
                            type="text"
                            name="age"
                            value={employee?.age}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="reg-input">
                        <label>Password</label>
                        <input
                            type="text"
                            name="password"
                            value={employee?.password}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="reg-input">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={employee?.phone}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="reg-input">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={employee?.email}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="reg-input">
                        <label>Profile</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleimage}
                        />
                    </div>
                    <button type="submit" className="btn text-light btn-orange">
                        Register
                    </button>
                </form>
                <p>
                    you Have an account pls! <Link to={"/"}>Login</Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default Register;
