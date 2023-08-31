export type TrainerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  certificates: File[];
};

export interface TrainerLoginData {
  email : string;
  password : string;
}

export interface TrainerDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  certificates: string[];
}
