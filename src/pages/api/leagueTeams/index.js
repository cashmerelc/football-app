import { log } from "console";
import dbConnect from "../../db/dbConnect.mjs";
import LeagueTeam from "../../db/models/LeagueTeam.mjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newTeam = req.body;
      await LeagueTeam.create(newTeam);
      return res
        .status(200)
        .json({ status: "League Team creates successfully" });
    } catch (err) {
      console.log("Error: ", err);
      return res.status(500).json({ error: err });
    }
  }
}
