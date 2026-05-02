import express from "express";
import { authCheck } from "../middleware/auth-middleware.js";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.get("/", authCheck, getAllCourses);
courseRouter.get("/:id", authCheck, getCourseById);
courseRouter.post("/", authCheck, createCourse);
courseRouter.put("/:id", authCheck, updateCourse);
courseRouter.delete("/:id", authCheck, deleteCourse);

export default courseRouter;