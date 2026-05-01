# Final Assessment — Server-Side JavaScript

## Overview

You have built the Student Management API. For the final assessment, you will **add a brand-new resource** of your choice to the same project using the same patterns.

Choose a resource that makes sense in a school context. Examples:
- `Course` (title, description, credits, instructor)
- `Subject` (name, code, semester)
- `Room` (number, building, capacity, type)
- `Club` (name, category, president, members)

You are free to choose any resource as long as it has **at least 4 meaningful fields** and is distinct from `User/Student`.

---

## What You Must Deliver

Create the following files (mirroring the student resource structure):

```
BACK/
  models/          <yourResource>Model.js       ← Mongoose schema
  services/        <yourResource>Service.js     ← DB logic (Mongoose)
  controllers/     <yourResource>Controller.js  ← Request handlers
  routes/          <yourResource>Route.js       ← Express router
```

And update:

```
BACK/
  index.js                                      ← mount your new router
```

---

## Requirements

### 1. Model (`models/`)
- Define a Mongoose schema with **at least 4 fields**
- Each field must have a `type` and `required` where appropriate
- Export the model as the default export

### 2. Service (`services/`)
- Export the following 5 functions using Mongoose methods:
  | Function | Mongoose method |
  |---|---|
  | `findAll<Resource>()` | `.find({})` |
  | `find<Resource>ById(id)` | `.findById(id)` |
  | `create<Resource>Service(data)` | `.create(data)` |
  | `update<Resource>Service(id, data)` | `.findByIdAndUpdate(id, data)` |
  | `delete<Resource>Service(id)` | `.findByIdAndDelete(id)` |

### 3. Controller (`controllers/`)
- Export one async handler per CRUD operation
- Each handler must:
  - Call the matching service function and `await` the result
  - Respond with the correct HTTP status code and JSON body
  - Wrap logic in `try/catch` and return an error status + message on failure

  | Handler | Success code | Error code |
  |---|---|---|
  | `getAll` | 200 | 404 |
  | `getById` | 200 | 404 |
  | `create` | 201 | 500 |
  | `update` | 200 | 500 |
  | `delete` | 200 | 500 |

### 4. Router (`routes/`)
- Create an Express router with these 5 routes:
  ```
  GET    /           → getAll
  GET    /:id        → getById
  POST   /           → create
  PUT    /:id        → update
  DELETE /:id        → delete
  ```
- **All 5 routes must be protected** by the `authCheck` middleware from `middleware/auth-middleware.js`
  ```js
  import { authCheck } from "../middleware/auth-middleware.js";

  router.get("/", authCheck, getAll<Resource>);
  // etc.
  ```

### 5. Entry point (`index.js`)
- Import your new router
- Mount it at `/api/<your-resource>` (e.g. `/api/courses`, `/api/rooms`)

---

## Testing with Postman

All routes require a valid JWT. To get one:

1. `POST /api/students/signup` — create an account (or use an existing one)
2. `POST /api/students/login` — returns `{ token: "..." }`
3. In every subsequent request, add the header:
   ```
   Authorization: Bearer <your-token>
   ```

**Checklist of requests to test and include in your submission:**

- [ ] `POST /api/<resource>` — create at least 2 entries
- [ ] `GET /api/<resource>` — returns the list
- [ ] `GET /api/<resource>/:id` — returns one entry by its MongoDB `_id`
- [ ] `PUT /api/<resource>/:id` — updates one field
- [ ] `DELETE /api/<resource>/:id` — deletes an entry
- [ ] `GET /api/<resource>` without a token — must return `401`

Export your Postman collection as a JSON file and include it in the submission.

---

## Grading Rubric

Total: **100 points**

### Model — 15 pts
| Criteria | Points |
|---|---|
| Schema defined with `mongoose.Schema` and exported correctly | 5 |
| At least 4 fields with appropriate types | 5 |
| `required` used where semantically appropriate | 5 |

### Service — 20 pts
| Criteria | Points |
|---|---|
| All 5 functions exported | 10 |
| Correct Mongoose method used for each operation | 5 |
| `create` and `update` are `async` | 5 |

### Controller — 25 pts
| Criteria | Points |
|---|---|
| All 5 handlers exported and `async` | 5 |
| Correct HTTP status codes (201 for create, 200 others) | 5 |
| `try/catch` on every handler | 5 |
| Correct error status codes (404 / 500) with a message | 5 |
| `req.params.id` used correctly for `:id` routes | 5 |

### Router — 20 pts
| Criteria | Points |
|---|---|
| All 5 routes defined with correct HTTP verbs | 10 |
| `authCheck` applied to all 5 routes | 10 |

### Integration — 10 pts
| Criteria | Points |
|---|---|
| Router imported and mounted in `index.js` | 5 |
| API accessible at a sensible path (e.g. `/api/courses`) | 5 |

### Postman — 10 pts
| Criteria | Points |
|---|---|
| Collection exported and included in submission | 3 |
| All 5 CRUD requests present and working | 5 |
| Unauthenticated request returns 401 | 2 |

### Bonus — up to 10 pts
| Criteria | Points |
|---|---|
| `README.md` explaining the resource, its fields, and how to test it | +5 |
| Input validation (reject missing required fields with 400 before hitting the DB) | +5 |

---

## Submission Checklist

Before handing in, verify:

- [ ] Server starts without errors (`npm run epita`)
- [ ] All 4 new files exist in the correct folders
- [ ] `index.js` mounts the new router
- [ ] All routes return JSON
- [ ] All routes return `401` when called without a token
- [ ] Postman collection is exported and included

---

## What Will Get You Zero Points

- Modifying or copying files from `solut/` into your solution
- Submitting code that does not run
- A resource with fewer than 4 fields
- Routes that are not protected by `authCheck`
