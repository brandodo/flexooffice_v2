import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
  {
    discussion_id: {
      type: Schema.ObjectId,
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
    body: {
      type: String,
      required: true,
    },
    votes: [Schema.Types.Mixed],
    upvotes: Number,
    downvotes: Number,
  },
  { timestamps: true }
);

const Comment = models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
