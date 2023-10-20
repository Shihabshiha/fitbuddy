import mongoose, { Document, Schema, Model } from 'mongoose';

export interface EnrollmentDocument extends Document {
  programId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  payment: {
    amount: number;
    method: string;
    date: Date;
  };
  videosProgress : [
    {
      videoId : string;
      watched: boolean;
    },
  ]
}