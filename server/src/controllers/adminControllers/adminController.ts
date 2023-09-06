import { Request, Response } from "express";
import createAdminServices from "../../services/adminServices/adminService";
import { LoginRequestBody } from "../../types/commonTypes";
import transporter from "../../config/nodeMailerConfig";
import config from "../../config/config";
import { CustomRequest } from "../../types/custom-request";


const adminService = createAdminServices();

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
    console.log("userrrr", users);
    res.status(200).json(users);
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
    console.log('recipient mail',email)
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

