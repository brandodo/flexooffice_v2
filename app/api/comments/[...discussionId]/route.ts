import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connectMongoDB();

  const { discussionId } = params;

  try {
    const comments = await Comment.find({
      discussion_id: { $eq: discussionId[0] },
    });

    return NextResponse.json(comments, { status: 201 });
  } catch (err) {
    console.log(err, "Comments error");
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, { params }) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
  }

  const { discussionId } = params;
  const { author, body } = await req.json();

  author.id = session.user.id;

  console.log(author, "author");
  await connectMongoDB();

  try {
    await Comment.create({
      discussion_id: discussionId[0],
      author,
      body,
      upvotes: 0,
      downvotes: 0,
    });

    return NextResponse.json(
      {
        message: "Comment posted!",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
