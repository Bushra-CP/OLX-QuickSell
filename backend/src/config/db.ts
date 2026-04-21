import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log("No MONGODB_URI in .env file");
    process.exit(1);
  }

  await mongoose.connect(mongoURI);
  console.log("Connected to database");
};
