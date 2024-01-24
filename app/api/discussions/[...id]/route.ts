import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Discussion from "@/models/discussion";
import Comment from "@/models/comment";

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
