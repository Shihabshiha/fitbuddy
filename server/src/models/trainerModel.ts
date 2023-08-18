// src/models/trainerModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { Trainer } from '../types/trainerTypes';


const trainerSchema = new Schema<Trainer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const TrainerModel = mongoose.model<Trainer>('Trainer', trainerSchema);

export default TrainerModel;
