import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    scheduled_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      required: true,
    },
    owner: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Schema.ObjectId,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", taskSchema);

export default Task;
