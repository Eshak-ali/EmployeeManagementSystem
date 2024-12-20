const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const employee = require("./Routes/employee");
const admin = require("./Routes/admin");

const app = express();

app.use(express.json());
app.use(cors());
try {
    mongoose.connect("mongodb://localhost:27017/EMP-MS");
    console.log("connected successfully");
} catch (error) {
    console.log(error.message);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/employee", employee);
app.use("/admin", admin);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server Running at", PORT);
});
