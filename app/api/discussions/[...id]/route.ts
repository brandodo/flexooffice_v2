import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Discussion from "@/models/discussion";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();

    const { id } = params;

    try {
      const discussions = await Discussion.findById(id);

      return NextResponse.json(discussions, { status: 200 });
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
