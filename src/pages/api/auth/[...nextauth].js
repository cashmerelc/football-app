import NextAuth from "next-auth";
import { authOptions } from "./authOptions";
// import GithubProvider from "next-auth/providers/github";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "../../../lib/db";

// export const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// };

// const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       profile(profile) {
//         return {
//           id: profile.id,
//           // This ID is required but it will not be saved in the users collection
//           username: profile.username,
//           email: profile.email,
//           image: profile.avatar_url,

//           // You can add any other properties you want to the user object
//           //   admin: false,
//           //   preferedColors: ["#dddddd", "#ffffff"],
//         };
//       },
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     async session({ session, user }) {
//       // The user object from the database contains the ID of the user in your database

//       session.user.userId = user.id;

//       // With the code above you can add the user ID to the session object and use it in your pages

//       // Make sure you console.log the session and user objects to see what they contain

//       return session;
//     },
//   },
// };

export default NextAuth(authOptions);
