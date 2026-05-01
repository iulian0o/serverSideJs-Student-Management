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
