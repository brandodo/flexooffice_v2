import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    scheduled_date: {
      type: Date,
      required: true,
    },
    participants: {
      type: [Schema.ObjectId],
    },
    description: {
      type: String,
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

const Event = models.Event || mongoose.model("Event", eventSchema);

export default Event;
