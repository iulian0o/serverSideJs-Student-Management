import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentsController.js";

// TODO 1: Import getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent
//         from ../controllers/studentsController.js

const studentRouter = express.Router();

// TODO 2: Wire up the routes:

//   GET    /        → getAllStudents
studentRouter.get("/", getAllStudents);

//   GET    /:id     → getStudentById
studentRouter.get("/:id", getStudentById);

//   POST   /        → createStudent
studentRouter.post("/", createStudent);

//   PUT    /:id     → updateStudent
studentRouter.put("/", createStudent);

//   DELETE /:id     → deleteStudent
studentRouter.delete("/", deleteStudent);

export default studentRouter;
