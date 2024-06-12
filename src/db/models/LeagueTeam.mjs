import mongoose from "mongoose";

const { Schema } = mongoose;

const leagueTeamSchema = new Schema({
  name: { type: String, required: true },
  leagueId: { type: String, required: true },
  userId: { type: String, required: true },
});

const LeagueTeam =
  mongoose.models.LeagueTeam || mongoose.model("LeagueTeam", leagueTeamSchema);

export default LeagueTeam;
