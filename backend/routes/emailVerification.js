import express from "express";
import Subscriber from "../models/Subscriber.js";
import PendingSubscriber from "../models/PendingSubscriber.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get("/:token", async (req, res) => {
    const { token } = req.params;
    console.log({ token });

    try {
        // Find pending subscriber
        const pendingSub = await PendingSubscriber.findOne({ token });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        if (!pendingSub) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }

        // Move to main subscribers collection
        await Subscriber.create({ emailOrPhone: pendingSub.email, states: pendingSub.states });
        
        // Remove from pending subscribers
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: pendingSub.email,
            subject: "Subscription Confirmation",
            text: "Congratulations you have been successfully subscribed to our notification service. \n For every notification each of your credits will be used, we provide 4 credits for free. That mean you will get next 4 email notifications for free, in order to get all notification for tenure 2025-26 you have to pay a very nominal fee of ₹99. \n Thank you for subscribing to our service. \n \n \n \n Terms a conditions: \n 1. You will get 4 free notifications. \n 2. once exhausted all 4 nominal fee is charged as a subscription fee for 1 year. \n 3. No credits are used for promotions mail, only notifications use credits \n \n \n Thank you 🙂 \n Team ENROLLIX"
        });

        await PendingSubscriber.deleteOne({ _id: pendingSub._id });



        return res.json({ message: "Subscription confirmed successfully!" });


    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

export default router;