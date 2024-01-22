import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import AES from "crypto-js/aes";

export const POST = async (req: any) => {
  try {
    const { name, email, password, profile_image } = await req.json();
    const encryptPassword = await AES.encrypt(
      password,
      process.env.AES_PASSPHRASE as string
    );

    const profileImage = profile_image
      ? profile_image
      : "public/patrick-default.jpg";

    await connectMongoDB();

    await User.create({
      name,
      email,
      password: encryptPassword,
      profile_image: profileImage,
    });

    return NextResponse.json({ message: "Signup Complete!" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Signup Failed!" }, { status: 500 });
  }
};
