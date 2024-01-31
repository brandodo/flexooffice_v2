import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const DELETE = async (req, { params }) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();
    const { id } = params;

    try {
      await Task.findByIdAndDelete(id);

      return NextResponse.json({ message: "Task deleted!" }, { status: 201 });
    } catch (err) {
      console.log("err", err);
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  }
};
