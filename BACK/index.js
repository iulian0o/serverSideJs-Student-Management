import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./config/db";

// TODO 1: Import connectToMongoDB from ./config/db.js
connectToMongoDB();

// TODO 2: Import studentRouter from ./routes/studentsRoute.js

const app = express();
const port = 3000;

// TODO 3: Call connectToMongoDB() here to establish the DB connection

// Middleware — already set up for you
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))

// TODO 4: Mount studentRouter at "/api/students"
// Hint: app.use("/api/students", studentRouter)

app.get("/", (req, res) => {
  res.send("Server is running ...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
