import { Request, Response } from "express";
import createAuthService from "../../services/userServices/userAuthService";
import { SignupRequestBody, LoginRequestBody } from "../../types/commonTypes";
import config from "../../config/config";
import { OAuth2Client } from 'google-auth-library';

const authService = createAuthService();

export const userSignupController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password }: SignupRequestBody =
      req.body;
    const newUser = await authService.userSignup(
      firstName,
      lastName,
      email,
      password
    );
    res.status(201).json({ message: "User signup successful", user: newUser });
  } catch (error:any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const userLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequestBody = req.body;
    const { token, user } = await authService.userLogin(email, password);
    res.status(200).json({ message: "User login successful", token, user });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const sendEmailcontroller = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { email }: any = req.body;
    console.log('sendrrr mail',email)
    await authService.sendOtp(email);
    res.status(200).json({ message: "Otp sended to email" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error:error.message });
  }
};

export const verifyOtpController = async(req :Request , res:Response) =>{
  try{
    const { otp } : any = req.body;
    const result = await authService.verifyOtp(otp);
    res.status(200).json(result)
  }catch(error:any){
    console.error(error);
    res.status(400).json({ error:error.message });
  }
}

export const googleAuthController = async(req:Request , res:Response) => {
    
  try{
    const { data } = req.body
    const googleClientId = config.GOOGLE_CLIENT_ID as string
    const client = new OAuth2Client(googleClientId);

    const ticket = await client.verifyIdToken({
      idToken: data,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();
    console.log('Decoded Google JWT:', payload);

  }catch(error:any){
    res.status(400).json({ error:error.message });
  }
}



