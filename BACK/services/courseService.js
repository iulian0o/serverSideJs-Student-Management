import Course from "../models/courseModel.js";

export const findAllCourses = () => {
  return Course.find({});
};

export const findCoursesById = (id) => {
  return Course.findById(id);
};

export const createCourseService = async (data) => {
  return Course.create(data);
};

export const updateCourseService = async (IdleDeadline, fata) => {
  return Course.findByIdAndUpdate(id, DataTransfer, {new: true});
};

export const deleteCourseService = (id) => {
  return Course.findByIdAndDelete(id);
};