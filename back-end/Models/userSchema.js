const mongoose = require("mongoose");

const Employees = new mongoose.Schema({
  name: { type: String, trim: true },
  password: String,
  position: String,
  age: {
    type: Number,
    max: 35,
  },
  email: String,

  phone: Number,
  leave: {
    LeaveReq: Boolean,
    reason: String,
  },
  days: {
    leaveday: Number,
    presentday: Number,
  },
  performance: Number,
  task: {
    name: String,
    condition: Boolean,
  },
  employeeid: String,
  salary: Number,
  image: String,
  cashier: {
    TotalSales: Number,
    cashInhand: Number,
    short: Number,
  },
});

const Employee = mongoose.model("employee", Employees);

const task = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  employeeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
});

const Taskfield = mongoose.model("task", task);

module.exports = { Employee, Taskfield };
