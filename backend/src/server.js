import express from "express";
import tasksRouter from "./routers/tasksRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();

connectDB();

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//routes

app.use("/api/tasks", tasksRouter);

app.listen(port, () => {
  console.log("Server is running on port 5001");
});
