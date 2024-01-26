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
    const discussion = await Discussion.findById(id);

    const existingVote = await Vote.find({
      $and: [{ discussion_id: id }, { voter_id: session?.user?.id }],
    });

    // Update existing vote
    if (existingVote[0]) {
      // Un-apply same vote
      if (existingVote[0].type === vote) {
        await Vote.deleteOne({ _id: existingVote[0]._id });
        discussion.votes.pull(existingVote[0]._id);

        if (vote === "up") {
          discussion.upvotes--;
        }

        if (vote === "down") {
          discussion.downvotes--;
        }
      }

      if (existingVote[0].type !== vote) {
        await Vote.updateOne({ _id: existingVote[0]._id }, { type: vote });

        if (vote === "up") {
          discussion.upvotes++;
          discussion.downvotes--;
        }
        if (vote === "down") {
          discussion.downvotes++;
          discussion.upvotes--;
        }
      }
    } else {
      // Create new vote
      const newVote = new Vote({
        discussion_id: id,
        voter_id: session.user.id,
        voter_name: session.user.name,
        type: vote,
      });

      await newVote.save();

      // Add new vote ref to discussion votes array
      discussion.votes.push(newVote._id);

      // Increment count accordingly
      if (vote === "up") {
        discussion.upvotes++;
      }
      if (vote === "down") {
        discussion.downvotes++;
      }
    }

    discussion.save();

    const jsonDoc = discussion.toJSON();

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
