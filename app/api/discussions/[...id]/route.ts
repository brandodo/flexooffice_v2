import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Discussion from "@/models/discussion";
import { NextApiRequest } from "next";

export const GET = async (_: NextApiRequest, { params }) => {
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
};
