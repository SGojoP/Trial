import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  emailOrPhone: { type: String, required: true, unique: true },
  states: { type: [String], required: true }, // Array of selected states
  createdAt: { type: Date, default: Date.now },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
