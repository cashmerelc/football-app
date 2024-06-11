import dbConnect from "../../../db/dbConnect.mjs";
import { ObjectId } from "mongodb";
import FantasyLeague from "../../../db/models/FantasyLeague.mjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      console.log("Request Query: ", req.query.userId);
      console.log("Valid ObjectId? ", ObjectId.isValid(req.query.userId));
      const userObjectId = ObjectId.createFromHexString(userId);
      console.log("userObjectId: ", userObjectId);
      const leagues = await FantasyLeague.find({
        participants: userObjectId,
      });
      console.log("My leagues: ", leagues);

      if (!req) {
        return res.status(404).json({ error: "Not Found" });
      }
      res.status(200).json(leagues);
    } catch (err) {
      console.log("Error GET leagues: ", err);
      return res.status(500).json({ error: err });
    }
  }

  if (req.method === "POST") {
    try {
      const leagueData = req.body;
      await FantasyLeague.create(leagueData);
      return res.status(200).json({ status: "League created!" });
    } catch (err) {
      console.log("New League Request: ", req.body);

      console.log("POST error creating fantasy league.", err);
      return res.status(500).json({ error: err });
    }
  }
}
