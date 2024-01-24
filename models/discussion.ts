import mongoose, { Schema, models } from "mongoose";

const discussionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: Schema.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      profile_image: {
        type: String,
        required: true,
      },
    },
    comments: {
      type: Number,
    },
    upvotes: {
      type: Number,
    },
    downvotes: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Discussion =
  models.Discussion || mongoose.model("Discussion", discussionSchema);

export default Discussion;
