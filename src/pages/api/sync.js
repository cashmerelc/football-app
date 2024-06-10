import dbConnect from "../../db/dbConnect.mjs";
import syncData from "../../services/syncData.mjs";

export default async function handler(req, res) {
  try {
    await dbConnect();
    console.log("Syncing...");
    await syncData();
    res.status(200).json({ message: "Sync completed successfully" });
  } catch (err) {
    console.error("Error during sync: ", err);
    res.status(500).json({ err: "Error during sync" });
  }
}
