import dbConnect from "../../../../db/dbConnect.mjs";
import User from "../../../../db/models/User.mjs";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();
  console.log("UserId requested: ", id);
  try {
    if (req.method === "GET") {
      // Check if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ status: "Invalid user ID" });
      }

      // Convert id to ObjectId
      const userId = ObjectId.createFromHexString(id);
      console.log("userId as an ObjectId: ", userId);
      // Find the user by id
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: "404 Not Found" });
      }

      // Return the user data
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ status: "Internal Server Error", err });
  }
}
