import mongoose from "mongoose";

const connectDB = async () => {
  const uri = <string>process.env.MONGO_URI;

  try {
    const connection = await mongoose.connect(uri);
    console.log(
      `mongoose is connected on ${connection.connection.host}`.blue.bold
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
