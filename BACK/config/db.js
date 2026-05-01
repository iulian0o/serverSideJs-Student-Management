import mongoose from "mongoose";
import "dotenv/config";

// TODO 1: Read the MongoDB connection string from environment variables
// Hint: process.env.MONGO_URI
const MONGO_URI = process.env.MONGO_URI;

// TODO 2: Write an async function called connectToMongoDB that:
//   - calls mongoose.connect() with MONGO_URI
//   - logs "Connected to MongoDB" on success
//   - logs the error and calls process.exit(1) on failure
//   - wraps everything in a try/catch
export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};
