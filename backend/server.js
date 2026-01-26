import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);


app.listen(5000, () => {
  console.log("✅ Server started at http://localhost:5000");
});
