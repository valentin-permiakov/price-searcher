import mongoose from 'mongoose';

let isConnected = false; // track the connection status

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI)
    return console.log('MONGODB_URI is not defined');

  if (isConnected) return console.log('=> using existing databaes connection');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
