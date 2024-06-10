import mongoose from "mongoose";

const { Schema } = mongoose;

const seasonSchema = new Schema({
  externalId: { type: Number, required: true },
  year: { type: String, required: true },
});

const Season =
  mongoose.models?.Season || mongoose.model("Season", seasonSchema);

export default Season;
