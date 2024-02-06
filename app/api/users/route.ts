import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();

    try {
      const { q } = await req.json();

      if (q) {
        const users = await User.find({
          $text: { $search: q, $caseSensitive: false },
        });

        return NextResponse.json(users, { status: 201 });
      } else {
        const users = await User.find();

        return NextResponse.json(users, { status: 201 });
      }
    } catch (err) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  }
};
