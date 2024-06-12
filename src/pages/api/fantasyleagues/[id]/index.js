import dbConnect from "../../../../db/dbConnect.mjs";
import FantasyLeague from "../../../../db/models/FantasyLeague.mjs";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();
  try {
    if (req.method === "GET") {
      const league = await FantasyLeague.findById(id);
      if (!league) {
        return res.status(404).json({ status: "Fantasy League Not Found" });
      }

      res.status(200).json({ league: league });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ status: "Internal Server Error: ", err });
  }
}
