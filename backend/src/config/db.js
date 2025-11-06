import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Connected to DB..!");
  } catch (error) {
    console.error("Not connected, error while connecting:", error.message);
    process.exit(1);
  }
};

export default connectDb;
