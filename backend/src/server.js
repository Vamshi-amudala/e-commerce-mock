import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("Mock E-Com API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
