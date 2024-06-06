import dbConnect from "../../../../db/dbConnect";
import User from "../../../../db/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const user = req.body;
    await User.create(user);
    res.status(200).json({ status: "User created" });
    try {
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
}
