import { students } from "../../data/students.js";

export const findAllUsers = () => {
  if (!students) throw new Error("No students found");
  return students;
};
