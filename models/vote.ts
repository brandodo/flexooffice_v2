import mongoose, { Schema, models } from "mongoose";

const voteSchema = new Schema(
  {
    voter_id: {
      type: Schema.ObjectId,
      required: true,
    },
    voter_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    discussion_id: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
