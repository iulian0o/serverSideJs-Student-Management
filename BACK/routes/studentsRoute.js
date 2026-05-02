import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  signup,
  login
} from "../controllers/studentsController.js";

// TODO 1: Import getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent
//         from ../controllers/studentsController.js

export const studentRouter = express.Router();

// No auth needed. Public routes
studentRouter.post("/signup", signup);
studentRouter.post("/login", login);

// TODO 2: Wire up the routes:

//   GET    /        → getAllStudents
studentRouter.get("/", getAllStudents);

//   GET    /:id     → getStudentById
studentRouter.get("/:id", getStudentById);

//   POST   /        → createStudent
studentRouter.post("/", createStudent);

//   PUT    /:id     → updateStudent
studentRouter.put("/:id", updateStudent);

//   DELETE /:id     → deleteStudent
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;
