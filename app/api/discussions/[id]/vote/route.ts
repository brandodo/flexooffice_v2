import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Discussion from "@/models/discussion";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/lib/configs/auth/authOptions";
import Vote from "@/models/vote";

export const PUT = async (req, { params }) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
  }

  await connectMongoDB();

  const { id } = params;
  const { vote } = await req.json();

  try {
    const existingVote = await Vote.find({
      $and: [{ discussion_id: id }, { voter_id: session?.user?.id }],
    });

    if (!!existingVote[0] && existingVote[0].type === vote) {
      await Vote.deleteOne({ _id: existingVote[0]._id });

      await Discussion.findByIdAndUpdate(
        id,
        {
          $inc: {
            [vote === "up" ? "upvotes" : "downvotes"]: -1,
          },
        },
        { new: true }
      );
    } else if (!!existingVote[0] && existingVote[0].type !== vote) {
      await Vote.updateOne({ _id: existingVote[0]._id }, { type: vote });

      await Discussion.findByIdAndUpdate(
        id,
        {
          $inc: {
            [vote === "up" ? "upvotes" : "downvotes"]: 1,
            [existingVote[0].type === "up" ? "upvotes" : "downvotes"]: -1,
          },
        },
        { new: true }
      );
    } else {
      const newVote = await new Vote({
        discussion_id: id,
        voter_id: session.user.id,
        voter_name: session.user.name,
        type: vote,
      });

      await newVote.save();

      await Discussion.findByIdAndUpdate(
        id,
        {
          $inc: {
            [vote === "up" ? "upvotes" : "downvotes"]: 1,
          },
        },
        { new: true }
      );
    }

    const discussion = await Discussion.findById(id);

    const jsonDoc = await discussion.toJSON();

    return NextResponse.json(
      {
        message: "Vote updated!",
        data: jsonDoc,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("ERROR", err);

    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 401 }
    );
  }
};
