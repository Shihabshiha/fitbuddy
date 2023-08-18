import AdminModel from "../../models/adminModel";
import UserModel from "../../models/userModel";
import { User } from "../../types/userTypes";
import { generateJwtToken } from "../../middlewares/jwtAuth";

const createAdminServices = () => {
  const adminLogin = async (email: string, password: string) => {
    try {
      const admin = await AdminModel.findOne({ email });

      if (!admin) {
        throw new Error("Admin not found");
      }

      
      if (password !== admin.password) {
        throw new Error("Invalid password");
      }

      const token = generateJwtToken({ id: admin._id.toString() , role: 'admin' });
      return { token, admin };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getAllUsers = async(): Promise<User[]> =>{
    try {
      const users = await UserModel.find();
      return users;
    } catch (error:any) {
      throw new Error(error.message); 
    }
  }

  return {
    adminLogin,
    getAllUsers
  }
}

export default createAdminServices