import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully.");
    });
    mongoose.connection.on("error", () => {
      console.log("Error to connecting to database", error);
    });
    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    console.error("Failed to connect to database.", error);
    process.exit(1);
  }
};
export default connectDB;
