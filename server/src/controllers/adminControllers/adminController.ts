import { Request, Response } from "express";
import createAdminServices from "../../services/adminServices/adminService";
import { LoginRequestBody } from "../../types/commonTypes";
import transporter from "../../config/nodeMailerConfig";
import config from "../../config/config";
import { CustomRequest } from "../../types/custom-request";
import courseService from "../../services/trainerServices/trainerCourseService";

const adminService = createAdminServices();
const adminCourseService = courseService();

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequestBody = req.body;
    const { token, admin } = await adminService.adminLogin(email, password);
    res.status(200).json({ message: "Admin login successful", token, admin });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllUserController = async (req: CustomRequest, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({users});
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const getPendingTrainerVerificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const pendingList = await adminService.getPendingVerificationList();
    res.status(200).json({ pendingList });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const sendAcceptedMailController = async (
  req:Request,
  res:Response
) => {
  try {
    const { email } = req.body;
    await adminService.sendAcceptanceMail(email)
    res.status(200).json({ message: 'Email sent successfully' })
  }catch(error:any){
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
}  

export const sendRejectedMailController = async(req:Request, res:Response) =>{
  try{
    const { email , reason} = req.body;
    await adminService.sendRejectedMail(email,reason)
    res.status(200).json({ message: 'Email sent successfully' })
  }catch(error:any){
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
}

export const blockUnblockUserController = async (req:Request,res:Response) => {
  try{
    const userId :string = req.params.userId;
    const { isBlocked }  = req.body;
    const updatedUser = await adminService.blockUnblockUser(userId,isBlocked);
    res.status(200).json({updatedUser})
  }catch(error:any){
    if(error.message == "User not found"){
      res.status(404).json( { error: 'User not found'} )
    }else{
      res.status(500).json({error:"Internal server error"})
    }
  }
}

export const getAllCoursesController = async (req: CustomRequest, res: Response) => {
  try {
    const result = await adminService.getAllCourses();
    res.status(200).json({result});
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const listUnlistController = async (req:Request,res:Response) => {
  const courseId = req.params.courseId;
  const { isListed } = req.body;
  try{
    const updatedCourse = await adminCourseService.updateCourseStatus(courseId,isListed)
    res.status(200).json(updatedCourse)
  }catch(error:any){
    if (error.message === 'Course not found') {
      res.status(404).json({ error: 'Course not found' });
    } else {
      res.status(500).json({ error:error.message });
    }
  }
}

