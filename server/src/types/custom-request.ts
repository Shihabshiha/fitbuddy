import { Request } from 'express';

// export interface CustomRequest extends Request {
//   person?: string;
// }

export interface CustomRequest extends Request {
  person?: {
    id: string; // Assuming id is a string
    role: string; // Assuming role is a string
  };
}