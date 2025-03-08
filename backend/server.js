import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import unsubscribeRoutes from "./routes/unsubscribeRoute.js";
import notificationRoutes  from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/subscribers", subscriberRoutes);
app.use("/api", unsubscribeRoutes);
app.use("/api/notifications", notificationRoutes );
app.use("/api", adminRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));
