import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import Discussion from "@/models/discussion";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();

    const discussions = await Discussion.find();
    return NextResponse.json(discussions, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
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
          name: session?.user?.name,
          profile_image: session?.user?.profile_image,
        },
        comments: 0,
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
