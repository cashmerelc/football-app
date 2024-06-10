import mongoose from "mongoose";

const { Schema } = mongoose;

const fantasyFixtureSchema = new Schema({
  leagueId: { type: Number, required: true },
  firstParticipantId: { type: Number, required: true },
  secondParticipantId: { type: Number, required: true },
});

const FantasyFixture =
  mongoose.models?.FantasyFixture ||
  mongoose.model("FantasyFixture", fantasyFixtureSchema);

export default FantasyFixture;
