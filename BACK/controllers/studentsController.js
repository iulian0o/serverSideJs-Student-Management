// TODO 1: Import the functions you need from ../services/studentServiceMongoDB.js

// TODO 2: Implement each controller below
// Each controller must:
//   - be async
//   - call the matching service function and await the result
//   - respond with the correct status code and JSON
//   - catch errors and respond with an error status code + message

import jwt from "jsonwebtoken";
import "dotenv/config";
import { 
  findAllStudents,
  findStudentById,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  loginStudentService
} from "../services/studentServiceMongoDB.js";

export const getAllStudents = async (req, res) => {
  // TODO: call findAllStudents(), return 200 + the array
  // on error: return 404 + error message

  try {
    const students = await findAllStudents();

    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const getStudentById = async (req, res) => {
  // TODO: get the id from req.params
  // call findStudentById(id), return 200 + the student
  // on error: return 404 + "Student not found"

  try {
    const {id} = req.params;
    const student = await findStudentById(id);

    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({message: "Student not found"});
  }
};

export const createStudent = async (req, res) => {
  // TODO: destructure name, email, password from req.body
  // call createStudentService({ name, email, password }), return 201 + success message
  // on error: return 500 + error message

  try {
    const {name, email, password, gpa, major} = req.body;
    const newStudent = await createStudentService({ name, email, password, gpa, major});

    res.status(201).json({message: "Student created succesfully", student: newStudent});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const updateStudent = async (req, res) => {
  // TODO: get the id from req.params
  // call updateStudentService(id, req.body), return 200 + the updated student
  // on error: return 500 + error message

  try {
    const {id} = req.params;
    const updatedStudent = await updateStudentService(id, req.body);

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const deleteStudent = async (req, res) => {
  // TODO: get the id from req.params
  // call deleteStudentService(id), return 200 + success message
  // on error: return 500 + error message

  try {
    const {id} = req.params;
    await deleteStudentService(id);

    res.status(200).json({message: "Student deledte successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const signup = async (req, res) => {
  try {
    const {name, email, password, gpa, major} = req.body;
    const newStudent = await createStudentService({name, email, password, gpa, major});

    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    res.status(201).json({message: "Acoount created succesfully", studnt: newStudent});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await loginStudentService(email, password);

    const token = jwt.sign(
      {id: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: "24h"}
    );

    res.status(200).json({token});
  } catch (error) {
    res.status(401).json({message: error.message});
  }
};