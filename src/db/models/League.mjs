import mongoose from "mongoose";

const { Schema } = mongoose;

const leagueSchema = new Schema({
  externalId: { type: Number, required: true },
  name: { type: String, required: true },
  active: { type: Boolean },
  image: { type: String },
  subType: { type: String },
  countryId: { type: Number },
});

const League =
  mongoose.models?.League || mongoose.model("League", leagueSchema);

export default League;
