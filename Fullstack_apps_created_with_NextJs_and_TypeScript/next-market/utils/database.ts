import mongoose from "mongoose";
import { config } from "dotenv";
const { MONGO_DB_CON_STR } = config().parsed;

export default async function connectDB() {
  try {
    mongoose.connect(MONGO_DB_CON_STR);
    console.log("Success: Connected to MongoDB");

  } catch (error) {
    console.error("Error: Unconnected to MongoDB", error);
    throw new Error(error);
  }
};
