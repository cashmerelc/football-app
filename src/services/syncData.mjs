import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import useSWR from "swr";
import dbConnect from "../db/dbconnect.mjs";
import Season from "../db/models/Season.mjs";
import Player from "../db/models/Player.mjs";
import SyncTracking from "../db/models/SyncTracking.mjs";

console.log("NEXT_PUBLIC_MONGODB_URI:", process.env.NEXT_PUBLIC_MONGODB_URI);

const fetcher = (url) => fetch(url).then((res) => res.json());

export default async function syncData({ category }) {
  await dbConnect();

  const syncDoc = await SyncTracking.findOne();
  const now = new Date();

  if (syncDoc && now - new Date(syncDoc.lastSync) < 24 * 60 * 60 * 1000) {
    console.log("Sync already performed in the last 24 hours.");
    return;
  }

  if (category === "seasons") {
    try {
      const existingSeasons = await Season.find();
      const existingSeasonIds = existingSeasons.map(
        (season) => season.externalId
      );

      const { data, error } = useSWR("/api/seasons", fetcher);

      if (!data && !error) return;
      if (error) return console.log("Error loading seasons");

      const seasonData = data.data;

      const newSeasons = seasonData.filter(
        (season) => !existingSeasonIds.includes(season.id)
      );

      if (newSeasons.length > 0) {
        await Season.insertMany(
          newSeasons.map((season) => ({
            externalId: season.id,
            year: season.name,
          }))
        );
      }
      console.log("Seasons synced");
    } catch (error) {
      console.log("Error syncing seasons:", error);
    }
  }

  if (category === "players") {
    try {
      const existingPlayers = await Player.find();
      const existingPlayerIds = existingPlayers.map(
        (player) => player.externalId
      );

      const { data, error } = useSWR("/api/players", fetcher);

      if (!data && !error) return;
      if (error) return console.log("Error loading players");

      const playerData = data.data;

      const newPlayers = playerData.filter(
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
      }
      console.log("Players synced.");
    } catch (error) {
      console.log("Error syncing players:", error);
    }
  }

  await SyncTracking.updateOne({}, { lastSync: now }, { upsert: true });
  console.log("Sync timestamp updated.");
}

// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// import useSWR from "swr";
// import dbConnect from "../db/dbConnect.mjs";
// import Season from "../db/models/Season.mjs";
// import Player from "../db/models/Player.mjs";
// import SyncTracking from "../db/models/SyncTracking.mjs";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default async function syncData({ category }) {
//   await dbConnect();

//   // Get last sync date from database and check if we need to sync (more than 24 hours since last sync)
//   const syncDoc = await SyncTracking.findOne();
//   const now = new Date();

//   if (syncDoc && now - new Date(syncDoc.lastSync) < 24 * 60 * 60 * 1000) {
//     console.log("Sync already performed in the last 24 hours.");
//     return;
//   }
//   // What needs to be synced with the API? Seasons, Players?
//   if (category === "seasons") {
//     try {
//       // Get seasons from the API. If that season is not in the db, add it. If it is already in the db, ignore it.

//       const existingSeasons = await Season.find();
//       const existingSeasonIds = existingSeasons.map(
//         (season) => season.externalId
//       );

//       const { data, error } = useSWR("/api/seasons", fetcher);

//       // if (!data && !error) return <h2>Loading...</h2>;
//       // if (error) return <h2>Error loading seasons</h2>;

//       const seasonData = data.data;

//       const newSeasons = seasonData.filter(
//         (season) => !existingSeasonIds.includes(season.id)
//       );

//       if (newSeasons.length > 0) {
//         await Season.insertMany(
//           newSeasons.map((season) => ({
//             externalId: season.id,
//             year: season.name,
//           }))
//         );
//       }
//       console.log("Seasons synced");

//       return;
//     } catch (error) {
//       console.log("Error syncing seasons: ", error);
//       return;
//     }
//   }
//   if (category === "players") {
//     try {
//       // Get players from the API. If that player is not in the db, add it. If it is already in the db, ignore it.

//       const existingPlayers = await Player.find();
//       const existingPlayerIds = existingPlayers.map(
//         (player) => player.externalId
//       );

//       const { data, error } = useSWR("/api/players", fetcher);

//       // if (!data && !error) return <h2>Loading...</h2>;
//       // if (error) return <h2>Error loading players</h2>;

//       const playerData = data.data;

//       const newPlayers = playerData.filter(
//         (player) => !existingPlayerIds.includes(player.id)
//       );

//       if (newPlayers.length > 0) {
//         await Player.insertMany(
//           newPlayers.map((player) => ({
//             externalId: player.id,
//             fullName: player.name,
//             firstName: player.firstname,
//             lastName: player.lastname,
//             birthDate: player.date_of_birth,
//             nationality: player.nationality_id,
//             height: player.height,
//             position: player.position_id,
//             detailedPosition: player.detailed_position_id,
//             typeId: player.type_id,
//           }))
//         );
//       }
//       console.log("Players synced.");

//       return;
//     } catch (error) {
//       console.log("Error syncing players: ", error);
//       return;
//     }
//   }
// }
