// TODO 1: Import the functions you need from ../services/studentServiceMongoDB.js

// TODO 2: Implement each controller below
// Each controller must:
//   - be async
//   - call the matching service function and await the result
//   - respond with the correct status code and JSON
//   - catch errors and respond with an error status code + message

export const getAllStudents = async (req, res) => {
  // TODO: call findAllStudents(), return 200 + the array
  // on error: return 404 + error message
};

export const getStudentById = async (req, res) => {
  // TODO: get the id from req.params
  // call findStudentById(id), return 200 + the student
  // on error: return 404 + "Student not found"
};

export const createStudent = async (req, res) => {
  // TODO: destructure name, email, password from req.body
  // call createStudentService({ name, email, password }), return 201 + success message
  // on error: return 500 + error message
};

export const updateStudent = async (req, res) => {
  // TODO: get the id from req.params
  // call updateStudentService(id, req.body), return 200 + the updated student
  // on error: return 500 + error message
};

export const deleteStudent = async (req, res) => {
  // TODO: get the id from req.params
  // call deleteStudentService(id), return 200 + success message
  // on error: return 500 + error message
};
