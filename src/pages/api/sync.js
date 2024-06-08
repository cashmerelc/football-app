import dbConnect from "../../db/dbConnect.mjs";
import syncData from "../../services/syncData.mjs";

export default async function handler(req, res) {
  try {
    await dbConnect();
    await syncData({ category: "seasons" });
    await syncData({ category: "players" });
    request.status(200).json({ message: "Sync completed successfully" });
  } catch (err) {
    console.error("Error during sync: ", err);
    res.status(500).json({ err: "Error during sync" });
  }
}
