import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";

const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password }: any = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch =
            CryptoAES.decrypt(
              user.password,
              process.env.AES_PASSPHRASE as string
            ).toString(CryptoENC) === password;

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectMongoDB();
        const user = await User.findOne({ email: session?.user?.email });

        session.user.profile_image = user?.profile_image;

        return session;
      } catch (err) {
        console.log(err);
      }
      // return session;
    },
  },
};

export default authOptions;
