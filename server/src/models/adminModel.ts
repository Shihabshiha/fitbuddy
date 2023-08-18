
import mongoose, { Document, Schema } from 'mongoose';
import { Admin } from '../types/adminTypes';


const adminSchema = new Schema<Admin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AdminModel = mongoose.model<Admin>('Admin', adminSchema);

export default AdminModel;
