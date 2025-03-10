// import mongoose from "mongoose";

// const subscriberSchema = new mongoose.Schema({
//   emailOrPhone: { type: String, required: true, unique: true },
//   states: { type: [String], required: true }, // Array of selected states
//   createdAt: { type: Date, default: Date.now },
// });

// const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// export default Subscriber;


import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
    emailOrPhone: { type: String, required: true, unique: true },
    states: { type: [String], required: true },
    subscribedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Subscriber", SubscriberSchema);