import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import AES from "crypto-js/aes";

export const POST = async (req: any) => {
  try {
    const { name, email, password } = await req.json();
    const encryptPassword = await AES.encrypt(
      password,
      process.env.AES_PASSPHRASE
    );

    console.log(encryptPassword.toString());
    await connectMongoDB();
    await User.create({ name, email, password: encryptPassword });

    return NextResponse.json({ message: "Signup Complete!" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Signup Failed!" }, { status: 500 });
  }
};
