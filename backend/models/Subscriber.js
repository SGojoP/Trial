// import mongoose from "mongoose";

// const subscriberSchema = new mongoose.Schema({
//   emailOrPhone: { type: String, required: true, unique: true },
//   states: { type: [String], required: true }, // Array of selected states
//   createdAt: { type: Date, default: Date.now },
// });

// const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// export default Subscriber;


import mongoose from "mongoose";
import { type } from "os";

const SubscriberSchema = new mongoose.Schema({
    emailOrPhone: { type: String, required: true, unique: true },
    states: { type: [String], required: true },
    subscribedAt: { type: Date, default: Date.now, expire:  3153600},
    count: { type: Number, default: 4 },
    paymentstatus: {type: Boolean, default: false},
});

export default mongoose.model("Subscriber", SubscriberSchema);