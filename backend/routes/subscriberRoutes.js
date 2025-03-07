import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// Subscribe a new user
router.post("/subscribe", async (req, res) => {
  try {
    const { emailOrPhone, states } = req.body;

    if (!emailOrPhone || !states || states.length === 0) {
      return res.status(400).json({ message: "Email/Phone and states are required" });
    }

    const subscriber = new Subscriber({ emailOrPhone, states });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/state/:state", async (req, res) => {
    try {
      const state = req.params.state;
      const subscribers = await Subscriber.find({ states: state });
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });


export default router;
