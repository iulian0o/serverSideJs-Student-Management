import express from "express";

// TODO 1: Import getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent
//         from ../controllers/studentsController.js

const studentRouter = express.Router();

// TODO 2: Wire up the routes:
//   GET    /        → getAllStudents
//   GET    /:id     → getStudentById
//   POST   /        → createStudent
//   PUT    /:id     → updateStudent
//   DELETE /:id     → deleteStudent

export default studentRouter;
