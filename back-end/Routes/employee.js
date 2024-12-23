const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { Employee, Taskfield } = require("../Models/userSchema");
const { error } = require("console");
const { isValidObjectId } = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage });

router.post("/", uploads.single("image"), async (req, res) => {
  const {
    name,
    password,
    phone,
    age,
    email,
    employeeid,
    position,
    leave,
    days,
    Rating,
    task,
    salary,
    cashier,
  } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "no file uploaded" });
  }

  try {
    const empdetails = new Employee({
      name: name,
      password: password,
      phone: phone,
      age: age,
      email: email,
      employeeid: employeeid,
      position: position,
      image: req.file.filename,
      leave,
      days,
      Rating: Rating,
      task,
      salary: salary,
      cashier,
    });

    await empdetails.save();
    res.status(200).json({ message: "employee register sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const employee = await Employee.findOne({ name });
    if (!employee) {
      res.status(400).json({ message: "employee not found" });
    }
    if (employee.password !== password) {
      res.status(400).json({ message: "invalid password" });
    }
    res.status(200).json({ Message: "Login successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

// position

router.post("/position", async (req, res) => {
  const { _id, position, salary } = req.body;
  const positionupdate = await Employee.findByIdAndUpdate(_id, {
    position,
    salary,
  });
  if (positionupdate) {
    res.send(positionupdate);
  } else {
    res.status(400).json({ message: "position error" });
  }
});

router.post("/dashboard", async (req, res) => {
  const { name } = req.body;
  const user = await Employee.findOne({ name });
  res.send(user);
});

router.get("/all", async (req, res) => {
  const allemployee = await Employee.find();
  res.send(allemployee);
});

router.post("/update", uploads.single("image"), async (req, res) => {
  try {
    const { _id, ...emp } = req.body;
    const profile = await Employee.findById(_id);
    const img = req.file ? req.file.filename : `${profile.image}`;
    const updateemployee = await Employee.findByIdAndUpdate(
      _id,
      { ...emp, image: img },
      { new: true }
    );
    console.log("HELLO", emp);
    if (updateemployee) {
      res.send(updateemployee);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
    alert(error.message);
  }
});

//   Leave
router.post("/leave", async (req, res) => {
  const { _id, leave, days } = req.body;
  const leaveupdate = await Employee.findByIdAndUpdate(_id, { leave, days });
  if (leaveupdate) {
    res.send(leaveupdate);
    console.log("success");
  } else {
    alert(error);
  }
});

//   performance
router.post("/performance", async (req, res) => {
  const { _id, performance } = req.body;
  const performanceupdate = await Employee.findByIdAndUpdate(_id, {
    performance,
  });
  if (performanceupdate) {
    res.status(200).json({ message: "performance update successfully" });
  } else {
    res.status(400).json({ message: "performance updated failed" });
  }
});

// cashier
router.post("/cashier", async (req, res) => {
  const { _id, cashier } = req.body;
  const cashierupdate = await Employee.findByIdAndUpdate(_id, { cashier });
  if (cashierupdate) {
    res.send(cashierupdate);
  } else {
    res.status(400).json({ message: "cashier detailed failed" });
  }
});

// Delete user route
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findByIdAndDelete(id);
    if (emp) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Task

router.post("/task/:employeeid", async (req, res) => {
  const { employeeid } = req.params;
  const { name, description, status } = req.body;
  try {
    const task = new Taskfield({
      name: name,
      description: description,
      employeeid: employeeid,
      status: status,
    });
    res.send(task);
    await task.save();
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/taskdetail", async (req, res) => {
  const alltask = await Taskfield.find();
  if (alltask) {
    res.send(alltask);
    console.log(alltask);
  } else {
    res.status(400).json({ Message: "data not saved" });
  }
});

// Delete task
router.post("/taskdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Taskfield.findByIdAndDelete(id);
    if (emp) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// edit status
router.post("/taskstatus", async (req, res) => {
  const { _id, ...task } = req.body;
  const cashierupdate = await Taskfield.findByIdAndUpdate(_id, { ...task });
  if (cashierupdate) {
    res.send(cashierupdate);
  } else {
    res.status(400).json({ message: "cashier detailed failed" });
  }
});

router.post("/taskstatus/:id", async (req, res) => {
  const { id } = req.params;
  const cashierupdate = await Taskfield.findByIdAndUpdate(id, {
    status: "doing",
  });
  if (cashierupdate) {
    res.send(cashierupdate);
  } else {
    res.status(400).json({ message: "cashier detailed failed" });
  }
});

router.post("/completed/:id", async (req, res) => {
  const { id } = req.params;
  const cashierupdate = await Taskfield.findByIdAndUpdate(id, {
    status: "completed",
  });
  if (cashierupdate) {
    res.send(cashierupdate);
  } else {
    res.status(400).json({ message: "cashier detailed failed" });
  }
});

module.exports = router;
