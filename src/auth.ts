import NextAuth, { CredentialsSignin } from "next-auth";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { User } from "./models/UserModels";
import { compare } from "bcryptjs";
import { dbConnect } from "./lib/utils";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_ID,
    }),
    credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || password) {
          throw new CredentialsSignin("email and password is missing");
        }
        //connection with database
        await dbConnect();
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
          throw new CredentialsSignin("User not found");
        }
        const match = await compare(password, user.password);
        if (!match) {
          throw new CredentialsSignin("password is not match");
        }
        return { name: User.name, email: user.email, id: user._id };
      },
    }),
  ],
});
