import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Event from "@/models/event";

export const DELETE = async (req, { params }) => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    await connectMongoDB();
    const { id } = params;
    
    try {
      await Event.findByIdAndDelete(id);

      return NextResponse.json({ message: "Event deleted!" }, { status: 201 });
    } catch (err) {
      console.log("err", err);
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  }
};
