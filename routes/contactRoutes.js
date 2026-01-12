// import express from "express";
// import Contact from "../models/Contact.js";

// const router = express.Router();

// router.post("/contact", async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     const newContact = new Contact({
//       name,
//       email,
//       phone,
//       message
//     });

//     await newContact.save();

//     res.status(201).json({ success: true, message: "Message saved" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;







import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    if (!req.body) {
      return res.status(400).json({ success: false, message: "Request body is empty" });
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    const saved = await newContact.save();
    console.log("Saved contact:", saved);

    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("BACKEND ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
