const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const employee = require("./Routes/employee");
const admin = require("./Routes/admin");

const app = express();
app.use(
  cors({
    origin: process.env.APPLICATION_URL, // Adjust as needed
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connected successfully");
} catch (error) {
  console.log(error.message);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/employee", employee);
app.use("/admin", admin);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Running at", PORT);
});
