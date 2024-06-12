import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/db";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          // This ID is required but it will not be saved in the users collection
          username: profile.username,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      // The user object from the database contains the ID of the user in the database

      session.user.userId = user.id;
      return session;
    },
  },
};
