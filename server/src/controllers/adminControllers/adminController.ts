import { Request, Response } from "express";
import createAdminServices from "../../services/adminServices/adminService";
import { LoginRequestBody } from "../../types/commonTypes";


const adminService = createAdminServices();

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequestBody = req.body;
    const { token, admin } = await adminService.adminLogin(email, password);
    res
      .status(200)
      .json({ message: "Admin login successful", token, admin });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUserController = async(req:Request,res:Response) =>{
  try{
    const users = await adminService.getAllUsers()
    console.log('userrrr',users)
    res.status(200).json(users);
  }catch(error:any){
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}