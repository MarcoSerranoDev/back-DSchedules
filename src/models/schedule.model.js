import { Schema, model } from "mongoose";

const Schedule = new Schema(
  {
    horario: String,
    status: { type: String, default: "AVAILABLE" },
    user: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default model("Schedule", Schedule);
