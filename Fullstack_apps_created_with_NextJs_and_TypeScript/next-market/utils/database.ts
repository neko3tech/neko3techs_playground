import mongoose from "mongoose";
const { MONGO_DB_CON_STR } = process.env;

export default async function connectDB() {
  try {
    mongoose.connect(MONGO_DB_CON_STR);
    console.log("Success: Connected to MongoDB");

  } catch (error) {
    console.error("Error: Unconnected to MongoDB", error);
    throw new Error(error);
  }
};
