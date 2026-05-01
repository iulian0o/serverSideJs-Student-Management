// TODO 1: Import the User model from ../models/userModel.js

// TODO 2: Import bcrypt from "bcrypt"

// TODO 3: Export the following functions using the correct Mongoose methods:
//   - findAllStudents()          → returns all users        (hint: .find({}))
//   - findStudentById(id)        → returns one user by id   (hint: .findById())
//   - deleteStudentService(id)   → deletes a user by id     (hint: .findByIdAndDelete())

// TODO 4: Export createStudentService(newStudent)
//   Passwords must NEVER be stored as plain text in a database.
//   Before calling User.create(), hash the password with bcrypt:
//
//   const SALT_ROUNDS = 10;  // controls how expensive the hash is
//
//   const hashedPassword = await bcrypt.hash(newStudent.password, SALT_ROUNDS);
//   return User.create({ ...newStudent, password: hashedPassword });
//
//   This function must be async because bcrypt.hash() returns a Promise.

// TODO 5: Export updateStudentService(id, newStudent)
//   A user might update their profile without changing their password.
//   Only hash if a password field is present in the update payload:
//
//   if (newStudent.password) {
//     newStudent.password = await bcrypt.hash(newStudent.password, SALT_ROUNDS);
//   }
//   return User.findByIdAndUpdate(id, newStudent);
//
//   This function must also be async.

import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const findAllStudents = () => {
  return User.find({});
};

export const findStudentById = (id) => {
  return userModel.findById(id);
};

export const createStudentService = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  return User.create({...data, password: hashedPassword});
};

export const updateStudentService = async (IdleDeadline, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }
  return User.findByIdAndUpdate(id, data);
};

export const deleteStudentService = (id) => {
  return User.findByIdAndDelete(id);
};