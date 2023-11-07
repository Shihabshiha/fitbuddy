import AdminModel from "../../models/adminModel";
import UserModel from "../../models/userModel";
import { User } from "../../types/userTypes";
import { generateJwtToken } from "../../middlewares/jwtAuth";
import TrainerModel from "../../models/trainerModel";
import transporter from "../../config/nodeMailerConfig";
import config from "../../config/config";
import CourseModel from "../../models/courseModel";


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

  const getPendingVerificationList = async() => {
    try{
      const trainers = await TrainerModel.find({ isVerified: 'not_verified' });
      return trainers
    }catch(error:any){
      throw error
    }
  }

  const sendAcceptanceMail = async (email:string) => {
    try{
      const mailOptions = {
        from: config.EMAIL_NODE_MAILER, 
        to: email, 
        subject: 'Your Request Has Been Accepted',
        text: 'Congratulations! Your request for Trainer has been accepted.now you can login to your account',
      };
      const result = await transporter.sendMail(mailOptions) 

      if (result.accepted.length > 0) {
        await TrainerModel.updateOne({ email }, { $set: { isVerified: 'verified' } });
      }
      return result
    }catch(error:any){
      throw error
    }
  }

  const sendRejectedMail = async (email:string, reason:string) => {
    try{
      const mailOptions = {
        from: config.EMAIL_NODE_MAILER,
        to: email,
        subject: 'Your Request Has Been Rejected',
        html: `
          <p style="font-size: 14px; color: #333;">Dear recipient,</p>
          <p style="font-size: 16px; color: #333;">
            Your request has been rejected with the following reason:
          </p>
          <p style="font-size: 16px; font-weight: bold; color: #FF0000;">
            ${reason}
          </p>
          <p style="font-size: 14px; color: #333;">Thank you.</p>
        `
      };   
      const result = await transporter.sendMail(mailOptions)
      if (result.accepted.length > 0) {
        await TrainerModel.updateOne({ email }, { $set: { isVerified: 'rejected' } });
      }
      return result
    }catch(error:any){
      throw error
    }
  }

  const blockUnblockUser = async (userId:string,isBlocked:boolean) => {
    try{
      const update = { isBlocked : isBlocked };
      const options = { new: true };

      const updatedUser = UserModel.findByIdAndUpdate(
        userId,
        update,
        options
      )

      if(!updatedUser){
        throw new Error("User not found")
      }
      return updatedUser
    }catch(error:any){
      throw error
    }
  }

  const getAllCourses = async () => {
    try{
      const courses = await CourseModel.find().sort({ createdAt: -1 });
      return courses
    }catch(error:any){
      throw error
    }
  }


  return {
    adminLogin,
    getAllUsers,
    getPendingVerificationList,
    sendAcceptanceMail,
    sendRejectedMail,
    blockUnblockUser,
    getAllCourses,
  }
}

export default createAdminServices