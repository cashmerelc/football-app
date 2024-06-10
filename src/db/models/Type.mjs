import mongoose from "mongoose";

const { Schema } = mongoose;

const typeSchema = new Schema({
  externalId: { type: Number, required: true },
  name: { type: String, required: true },
  code: { type: String },
  modelType: { type: String },
  statGroup: { type: String },
  //   comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Type = mongoose.models?.Type || mongoose.model("Type", typeSchema);

export default Type;
