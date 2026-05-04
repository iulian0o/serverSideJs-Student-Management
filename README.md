# Student Management API

A REST API built with Express.js, MongoDB, and Mongoose following a 3-layer architecture: routes, controllers, and services. The API exposes two resources: students and courses. All course routes are protected with JWT authentication.

## Quick Start

To run the project locally without Docker, navigate to the BACK/ directory, create a .env file based on .env.example, install dependencies with npm install, and start the server with npm run dev. The server runs on http://localhost:3000.

To run with Docker, make sure Docker Desktop is running, then from the project root run:

    docker compose up --build

This builds the Node.js container and starts the server on http://localhost:3000. No manual dependency installation is needed. To stop the containers run:

    docker compose down

The .env file is not required when using Docker as the environment variables are injected directly through docker-compose.yml.

---

## Stack

- Node.js with ES6 modules
- Express.js
- MongoDB via Mongoose
- bcrypt for password hashing
- jsonwebtoken for authentication

## Project Structure

BACK/
├── config/         database connection
├── controllers/    request handlers
├── middleware/     JWT authentication
├── models/         Mongoose schemas
├── routes/         Express routers
├── services/       database logic
└── index.js        entry point

---

## Resource — Course

A course represents a class offered at the school. It is distinct from the student resource and requires authentication on all routes.

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| title | String | yes | Name of the course |
| description | String | yes | Short summary of the course content |
| credits | Number | yes | Number of academic credits |
| instructor | String | yes | Name of the instructor teaching the course |
| semester | String | yes | Semester when the course is offered |

Mongoose adds _id, createdAt, and updatedAt automatically. The schema is defined in models/courseModel.js.

### Endpoints

All course routes require a valid JWT token in the Authorization header as a Bearer token. Routes are defined in routes/courseRoute.js, handled in controllers/courseController.js, and interact with the database through services/courseService.js.

| Method | Path | Description | Auth | Success | Error |
|---|---|---|---|---|---|
| GET | /api/courses | Get all courses | yes | 200 | 404 |
| GET | /api/courses/:id | Get one course | yes | 200 | 404 |
| POST | /api/courses | Create a course | yes | 201 | 400, 500 |
| PUT | /api/courses/:id | Update a course | yes | 200 | 400, 500 |
| DELETE | /api/courses/:id | Delete a course | yes | 200 | 500 |

---

## Authentication

Course routes require a JWT token. Authentication logic is handled in middleware/auth-middleware.js. To obtain a token, use the student login route defined in routes/studentsRoute.js and handled in controllers/studentsController.js.

Send a POST request to /api/students/signup to create an account, then a POST request to /api/students/login with your email and password. The login response returns a token field which must be included in the Authorization header of every subsequent course request.

Sending a request without a token returns 401. Sending a request with an invalid or expired token also returns 401.

---

## Input Validation

The createCourse and updateCourse handlers in controllers/courseController.js validate the request body before passing data to the service layer. If required fields are missing on creation, the server returns 400 with a message listing the expected fields. If the update body is empty, the server also returns 400. The database is never called in either case.

The same validation pattern is applied to createStudent in controllers/studentsController.js.

---

## Testing

A Postman collection is included in the repository. It covers all five CRUD operations for the course resource, the signup and login flow, and the 401 unauthenticated case. Import the collection, run the login request first to obtain a token, then set it as the Authorization header for the remaining requests.
