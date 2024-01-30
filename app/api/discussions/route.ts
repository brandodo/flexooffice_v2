import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import Discussion from "@/models/discussion";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connectMongoDB();

  try {
    const discussions = await Discussion.aggregate()
      .lookup({
        from: "comments",
        localField: "_id",
        foreignField: "discussion_id",
        as: "comments",
      })
      .addFields({
        comments: { $size: "$comments" },
      })
      .lookup({
        from: "votes",
        let: {
          discussionId: "$_id",
          userId: "$author.id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$discussion_id", "$$discussionId"] },
                  { $eq: ["$voter_id", "$$userId"] },
                ],
              },
            },
          },
        ],
        as: "hasVoted",
      })
      .addFields({
        hasVoted: { $arrayElemAt: ["$hasVoted.type", 0] },
      })
      .project({
        _id: 1,
        title: 1,
        body: 1,
        author: 1,
        comments: 1,
        votes: 1,
        upvotes: 1,
        downvotes: 1,
        hasVoted: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    return NextResponse.json(discussions, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    const { title, body } = await req.json();
    await connectMongoDB();

    try {
      await Discussion.create({
        title,
        body,
        author: {
          id: session?.user?.id,
          name: session?.user?.name,
          profile_image: session?.user?.profile_image,
        },
        comments: 0,
        votes: [],
        upvotes: 0,
        downvotes: 0,
      });

      return NextResponse.json(
        { message: "Discussion created!" },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
  }
};
