export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string; 
}

export interface UserLoginData {
  email : string;
  password : string;
}

export interface userDetails {
  firstName: string;
  lastName: string;
  email: string;
  _id : string;
  isBlocked : boolean;
  phoneNumber : string;
  profileImage: string;
  enrolledPrograms : string[];
}

