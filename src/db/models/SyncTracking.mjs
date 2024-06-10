import mongoose from "mongoose";

const { Schema } = mongoose;

const syncTrackingSchema = new Schema({
  lastSync: { type: Date, required: true },
});

const SyncTracking =
  mongoose.models?.SyncTracking ||
  mongoose.model("SyncTracking", syncTrackingSchema);

export default SyncTracking;
