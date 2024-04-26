import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signIn", { user, account, profile, email, credentials });
      await dbConnect();
      const dbUser = await User.findOne({ userId: user.id });
      if (dbUser === null) {
        await User.create({ userId: user.id, email: user.email });
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      await dbConnect();
      if (user) {
        const dbUser = await User.findOne({ userId: user.id });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
