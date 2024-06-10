import mongoose from "mongoose";

const { Schema } = mongoose;

const participantSchema = new Schema({
  userId: { type: Number, required: true },
  leagueId: { type: Number, required: true },
  teamId: { type: Number },
  readyState: { type: bool },
});

const Participant =
  mongoose.models?.Participant ||
  mongoose.model("Participant", participantSchema);

export default Participant;
