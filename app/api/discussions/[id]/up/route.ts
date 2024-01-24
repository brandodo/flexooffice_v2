import authOptions from "@/lib/configs/auth/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export const PUT = async (req, { params }) => {
  const session: any = await getServerSession(authOptions);

  await connectMongoDB();

  const { id } = params;
};
