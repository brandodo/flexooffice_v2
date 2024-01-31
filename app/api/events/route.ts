import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import Event from "@/models/event";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();

    try {
      const events = await Event.find({
        "owner.id": session.user.id,
      });

      return NextResponse.json(events, { status: 201 });
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
    const { title, scheduled_date, participants, description } =
      await req.json();
    await connectMongoDB();

    try {
      const newEvent = await Event.create({
        title,
        scheduled_date,
        participants,
        description,
        owner: {
          name: session.user.name,
          id: session.user.id,
          email: session.user.email,
        },
      });

      const data = await newEvent.toJSON();

      return NextResponse.json(
        { message: "Event created!", ...data },
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
