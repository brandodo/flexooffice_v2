import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Discussion from "@/models/discussion";
import Comment from "@/models/comment";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/lib/configs/auth/authOptions";

export const GET = async (req, { params }) => {
  await connectMongoDB();

  const { id } = params;

  try {
    const discussion = await Discussion.findById(id);
    const commentCount = await Comment.countDocuments({
      discussion_id: { $eq: id },
    });

    discussion.comments = commentCount;
    return NextResponse.json(discussion, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

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
    const voteIndex: number = discussion.votes.findIndex((v) => {
      return v.user_id.toString() === session.user.id.toString();
    });

    // Vote exists
    if (voteIndex !== -1) {
      // Remove vote if same vote cast
      if (discussion.votes[voteIndex].type === vote) {
        discussion.votes.splice(voteIndex, 1);
        if (vote === "up") {
          discussion.upvotes--;
        }
        if (vote === "down") {
          discussion.downvotes--;
        }
      } else {
        // Otherwise set value to new vote
        discussion.votes.set(voteIndex, {
          user_id: session.user.id,
          username: session.user.name,
          profile_image: session.user.profile_image,
          type: vote,
        });

        // Update vote counts
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
      discussion.votes.push({
        user_id: session.user.id,
        username: session.user.name,
        profile_image: session.user.profile_image,
        type: vote,
      });

      if (vote === "up") {
        discussion.upvotes++;
      } else {
        discussion.downvotes++;
      }
    }

    await discussion.save();

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
