import mongoose from "mongoose";

console.log("Mongoose:", mongoose);
console.log("Mongoose.connect:", mongoose.connect);

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log("MONGODB_URI:", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local"
  );
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("dbConnect called");
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };
    console.log("Creating new mongoose connection");
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to mongoose:", error);
        throw error;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
