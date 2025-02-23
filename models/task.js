import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["open", "completed"], default: "open" },
});

export default mongoose.model("Task", TaskSchema);
