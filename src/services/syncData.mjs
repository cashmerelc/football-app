import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "../db/dbconnect.mjs";
import Season from "../db/models/Season.mjs";
import Player from "../db/models/Player.mjs";
import Team from "../db/models/Team.mjs";
import Type from "../db/models/Type.mjs";

import SyncTracking from "../db/models/SyncTracking.mjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CORE_API_URL = process.env.NEXT_PUBLIC_CORE_API_URL;
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

  //Sync Types

  // let hasSyncedTypes = false;
  // let isNextPageTypes = true;

  // let currentPageTypes = 1;
  // while (!hasSyncedTypes && isNextPageTypes) {
  //   try {
  //     const typesData = await fetcher(
  //       `${CORE_API_URL}/types?api_token=${API_TOKEN}&page=${currentPageTypes}&per_page=50`
  //     );
  //     if (typesData.data.length > 0) {
  //       await Type.insertMany(
  //         typesData.data.map((type) => ({
  //           externalId: type.id,
  //           name: type.name,
  //           code: type.code,
  //           modelType: type.model_type,
  //           statGroup: type.stat_group,
  //         }))
  //       );
  //     }
  //     console.log("Types added.");
  //     console.log(`Types has more pages? ${typesData.pagination.has_more}`);
  //     typesData.pagination.has_more
  //       ? (currentPageTypes = currentPageTypes + 1)
  //       : (isNextPageTypes = false);
  //   } catch (err) {
  //     console.log("Error syncing types: ", err);
  //   }
  // }
  // hasSyncedTypes = true;

  // Get seasons currently in the database

  const existingSeasons = await Season.find();
  const existingSeasonIds = existingSeasons.map((season) => season.externalId);

  // Get players currently in the database

  const existingPlayers = await Player.find();
  const existingPlayerIds = existingPlayers.map((player) => player.externalId);

  // Get teams currently in the database

  const existingTeams = await Team.find();
  const existingTeamIds = existingTeams.map((team) => team.externalId);

  // Sync Teams

  let isNextPageTeams = true;
  let hasSyncedTeams = false;
  let currentPageTeams = 1;
  while (isNextPageTeams && !hasSyncedTeams) {
    try {
      console.log(`Fetching teams page ${currentPageTeams}`);

      // fetch teams from API
      const teamData = await fetcher(
        `${API_URL}/teams?api_token=${API_TOKEN}&page=${currentPageTeams}&per_page=50`
      );
      // Filter out the teams that are already in the database
      const newTeams = teamData.data.filter(
        (team) => !existingTeamIds.includes(team.id)
      );
      // If there are any new teams, add them to the database
      if (newTeams.length > 0) {
        await Team.insertMany(
          newTeams.map((team) => ({
            externalId: team.id,
            name: team.name,
            shortCode: team.short_code,
            imagePath: team.image_path,
            lastPlayed: team.last_played_at,
          }))
        );
        console.log("Teams synced");
      } else {
        console.log(`No new teams in page ${currentPageTeams}`);
      }
      console.log(`Teams has more pages? ${teamData.pagination.has_more}`);
      teamData.pagination.has_more
        ? (currentPageTeams = currentPageTeams + 1)
        : (isNextPageTeams = false);
    } catch (error) {
      console.log("Error during sync:", error);
      isNextPageTeams = false;
    }
  }
  hasSyncedTeams = true;

  // Sync seasons

  // let isNextPageSeasons = true;
  // let hasSyncedSeasons = false;
  // let currentPageSeasons = 1;
  // while (isNextPageSeasons && !hasSyncedSeasons) {
  //   try {
  //     console.log(`Fetching seasons page ${currentPageSeasons}`);

  //     // fetch seasons from API
  //     const seasonData = await fetcher(
  //       `${API_URL}/seasons?api_token=${API_TOKEN}&page=${currentPageSeasons}&per_page=50`
  //     );
  //     // Filter out the seasons that are already in the database
  //     const newSeasons = seasonData.data.filter(
  //       (season) => !existingSeasonIds.includes(season.id)
  //     );
  //     // If there are any new seasons, add them to the database
  //     if (newSeasons.length > 0) {
  //       await Season.insertMany(
  //         newSeasons.map((season) => ({
  //           externalId: season.id,
  //           year: season.name,
  //         }))
  //       );
  //       console.log("Seasons synced");
  //     } else {
  //       console.log(`No new seasons in page ${currentPageSeasons}`);
  //     }
  //     console.log(`Seasons has more pages? ${seasonData.pagination.has_more}`);
  //     seasonData.pagination.has_more
  //       ? (currentPageSeasons = currentPageSeasons + 1)
  //       : (isNextPageSeasons = false);
  //   } catch (error) {
  //     console.log("Error during sync:", error);
  //     isNextPageSeasons = false;
  //   }
  //   hasSyncedSeasons = true;
  // }

  // Sync players

  // let isNextPagePlayers = true;
  // let currentPagePlayers = 1;
  // let lastPageSynced = 1;
  // while (isNextPagePlayers) {
  //   try {
  //     console.log(`Fetching players page ${lastPageSynced}`);

  //     // fetch players from API
  //     const playerData = await fetcher(
  //       `${API_URL}/players?api_token=${API_TOKEN}&page=${lastPageSynced}&per_page=50`
  //     );
  //     // Filter out the players that are already in the database
  //     const newPlayers = playerData.data.filter(
  //       (player) =>
  //         !existingPlayerIds.includes(player.id) &&
  //         player.name &&
  //         player.firstname &&
  //         player.lastname
  //     );
  //     // If there are any new players, add to the database
  //     if (newPlayers.length > 0) {
  //       await Player.insertMany(
  //         newPlayers.map((player) => ({
  //           externalId: player.id,
  //           fullName: player.name,
  //           firstName: player.firstname,
  //           lastName: player.lastname,
  //           birthDate: player.date_of_birth,
  //           nationality: player.nationality_id,
  //           height: player.height,
  //           position: player.position_id,
  //           detailedPosition: player.detailed_position_id,
  //           typeId: player.type_id,
  //         }))
  //       );
  //       console.log("Players synced.");
  //     } else {
  //       console.log(`No new players in page ${lastPageSynced}`);
  //     }
  //     console.log(`Players has more pages? ${playerData.pagination.has_more}`);
  //     lastPageSynced = currentPagePlayers;
  //     playerData.pagination.has_more
  //       ? (currentPagePlayers = currentPagePlayers + 1)
  //       : (isNextPagePlayers = false);

  //     // Update sync timestamp
  //     await SyncTracking.updateOne({}, { lastSync: now }, { upsert: true });
  //     console.log("Sync timestamp updated.");
  //   } catch (error) {
  //     console.log("Error during sync:", error);
  //     isNextPagePlayers = false;
  //   }
  // }
}
