import mongoose from "mongoose";

const { Schema } = mongoose;

const fantasyLeagueSchema = new Schema({
  leagueName: { type: String, required: true },
  seasonId: { type: String, required: true },
  adminId: { type: String, required: true },
  readyState: { type: bool },
  avatar: { type: String },
  participants: { type: [Schema.Types.ObjectId], ref: "Participant" },
});

const FantasyLeague =
  mongoose.models?.FantasyLeague ||
  mongoose.model("FantasyLeague", fantasyLeagueSchema);

export default FantasyLeague;
