const Admin = require("../Models/Admin");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/" || "/tmp");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

router.post("/set_admin", async (req, res) => {
    try {
        const prev = await Admin.findOne({
            name: "Zarastore",
        });

        if (prev) {
            return res.status(200).json({ message: "Admin exists already" });
        }

        const data = new Admin({
            name: "Zarastore",
            password: "1511",
        });
        await data.save();
        res.status(200).json({ message: "Admin set successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/all", async (req, res) => {
    const allemployee = await Admin.findOne();
    res.send(allemployee);
});

// const uploads = multer({ storage });
router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        const admin = await Admin.findOne({ name });
        if (!admin) {
            res.status(400).json({ message: "User not found" }, admin);
        }
        if (admin.password !== password) {
            res.status(400).json({ message: "password invalid" });
        }
        console.log(password);
        res.status(200).json({ Message: "login successfully" });
    } catch (error) {
        console.log(error.message);
    }
});

router.post("/update", uploads.single("image"), async (req, res) => {
    try {
        const { _id, name, password, phone, email } = req.body;
        const img = req.file ? req.file.filename : "image";
        const updateemployee = await Admin.findByIdAndUpdate(
            _id,
            { name, password, phone, email, image: img },
            { new: true }
        );

        if (updateemployee) {
            res.send(updateemployee);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(404).json({ message: "Error updating user", error });
    }
});

router.post("/dashboard", async (req, res) => {
    const { name } = req.body;
    const user = await Admin.findOne({ name });
    res.send(user);
});

module.exports = router;
