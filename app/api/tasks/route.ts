import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";

import Task from "@/models/task";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();

    try {
      const tasks = await Task.find({
        "owner.id": session.user.id,
      });

      return NextResponse.json(tasks);
    } catch (err) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  }
};

export const POST = async (req, res) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    const { title, scheduled_date, description, priority } = await req.json();
    await connectMongoDB();

    try {
      const newTask = await Task.create({
        title,
        scheduled_date,
        description,
        priority,
        owner: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        },
      });

      const data = await newTask.toJSON();

      return NextResponse.json(
        { message: "Task created!", ...data },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  }
};
