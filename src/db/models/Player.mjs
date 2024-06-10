import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema({
  externalId: { type: Number, required: true },
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String },
  nationality: { type: Number },
  height: { type: Number },
  position: { type: Number },
  detailedPosition: { type: Number },
  typeId: { type: Number },
  //   comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Player =
  mongoose.models?.Player || mongoose.model("Player", playerSchema);

export default Player;
