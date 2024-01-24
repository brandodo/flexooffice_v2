import mongoose, { Schema, models } from "mongoose";
import Comment from "./comment";

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
      get: async (discussion) => {
        return await Comment.countDocuments({ discussion_id: discussion._id });
      },
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
