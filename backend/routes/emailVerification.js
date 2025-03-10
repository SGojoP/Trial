import express from "express";
import Subscriber from "../models/Subscriber.js";
import PendingSubscriber from "../models/PendingSubscriber.js";

const router = express.Router();

router.get("/:token", async (req, res) => {
    const { token } = req.params;
    console.log({ token });

    try {
        // Find pending subscriber
        const pendingSub = await PendingSubscriber.findOne({ token });

        if (!pendingSub) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }

        // Move to main subscribers collection
        await Subscriber.create({ emailOrPhone: pendingSub.email, states: pendingSub.states });
        
        // Remove from pending subscribers
        await PendingSubscriber.deleteOne({ _id: pendingSub._id });
        return res.json({ message: "Subscription confirmed successfully!" });


    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

export default router;