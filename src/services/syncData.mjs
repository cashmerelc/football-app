import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "../db/dbconnect.mjs";
import Season from "../db/models/Season.mjs";
import Player from "../db/models/Player.mjs";
import SyncTracking from "../db/models/SyncTracking.mjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};
console.log("Awaiting sync...");

export default async function syncData() {
  console.log("Initiating sync...");

  await dbConnect();

  const syncDoc = await SyncTracking.findOne();
  const now = new Date();

  if (syncDoc && now - new Date(syncDoc.lastSync) < 24 * 60 * 60 * 1000) {
    console.log("Sync already performed in the last 24 hours.");
    return;
  }

  try {
    // Sync seasons
    const existingSeasons = await Season.find();
    const existingSeasonIds = existingSeasons.map(
      (season) => season.externalId
    );

    const seasonData = await fetcher(
      `${API_URL}/seasons?api_token=${API_TOKEN}`
    );

    const newSeasons = seasonData.data.filter(
      (season) => !existingSeasonIds.includes(season.id)
    );

    if (newSeasons.length > 0) {
      await Season.insertMany(
        newSeasons.map((season) => ({
          externalId: season.id,
          year: season.name,
        }))
      );
      console.log("Seasons synced");
    } else {
      console.log("No new seasons to sync");
    }

    // Sync players
    const existingPlayers = await Player.find();
    const existingPlayerIds = existingPlayers.map(
      (player) => player.externalId
    );

    const playerData = await fetcher(
      `${API_URL}/players?api_token=${API_TOKEN}`
    );

    const newPlayers = playerData.data.filter(
      (player) => !existingPlayerIds.includes(player.id)
    );

    if (newPlayers.length > 0) {
      await Player.insertMany(
        newPlayers.map((player) => ({
          externalId: player.id,
          fullName: player.name,
          firstName: player.firstname,
          lastName: player.lastname,
          birthDate: player.date_of_birth,
          nationality: player.nationality_id,
          height: player.height,
          position: player.position_id,
          detailedPosition: player.detailed_position_id,
          typeId: player.type_id,
        }))
      );
      console.log("Players synced.");
    } else {
      console.log("No new players to sync");
    }

    // Update sync timestamp
    await SyncTracking.updateOne({}, { lastSync: now }, { upsert: true });
    console.log("Sync timestamp updated.");
  } catch (error) {
    console.log("Error during sync:", error);
  }
}
