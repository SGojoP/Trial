import express from "express";
import Subscriber from "../models/Subscriber.js";


const router = express.Router();

router.post("/send-notification", async (req, res) => {
  const { states, message, link } = req.body;

  if (!states?.length || !message) {
    return res.status(400).json({ error: "States and message are required." });
  }

  try {
    const subscribers = await Subscriber.find({ states: { $in: states } });

    if (!subscribers.length) {
      return res.json({ message: "No subscribers found for the selected states." });
    }

    const notifications = subscribers.map((sub) => ({
      contact: sub.emailOrPhone,
      message,
      link,
    }));

    console.log("Sending notifications:", notifications);

    res.json({ message: "Notifications sent successfully.", notifications });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

export default router;
