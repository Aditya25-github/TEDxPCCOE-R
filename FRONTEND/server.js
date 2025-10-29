// server.js
import express from "express";
import cors from "cors";
import { sendMail } from "./src/contact/sendMail.js";

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint for sending mail
app.post("/api/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await sendMail(name, email, subject, message);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
