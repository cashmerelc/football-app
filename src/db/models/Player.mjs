import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema({
  externalId: { type: Number, required: true },
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String, required: true },
  nationality: { type: Number, required: true },
  height: { type: Number, required: true },
  position: { type: Number, required: true },
  detailedPosition: { type: Number, required: true },
  typeId: { type: Number, required: true },
  //   comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Player =
  mongoose.models?.Player || mongoose.model("Player", playerSchema);

export default Player;
