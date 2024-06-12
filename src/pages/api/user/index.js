import dbConnect from "../../../db/dbConnect.mjs";
import User from "../../../db/models/User";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  try {
    if (req.method === "GET") {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ status: "404 Not Found" });
      }
      return res.status(200).json({ status: "User found" });
    }
    if (req.method === "POST") {
      const user = req.body;
      await User.create(user);
      res.status(200).json({ status: "User created" });
      try {
      } catch (err) {
        res.status(500).json({ err: err });
      }
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ status: "Internal Server Error", err });
  }
}
