// src/database/mongooseConnection.ts
import mongoose from 'mongoose';
import config from './config';

const dbName='fitbuddy'

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database.connectionString,{dbName});
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};

export default connectDatabase;
