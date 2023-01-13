import mongoose, { connect } from "mongoose";
import { MONGODB__URL } from "./config";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await connect(MONGODB__URL);
    console.log("connect to db");
  } catch (error) {
    console.log(error);
  }
};
