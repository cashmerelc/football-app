import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema({
  externalId: { type: Number, required: true },
  name: { type: String, required: true },
  shortCode: { type: String },
  imagePath: { type: String },
  lastPlayed: { type: String },
  //   comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Team = mongoose.models?.Team || mongoose.model("Team", teamSchema);

export default Team;
