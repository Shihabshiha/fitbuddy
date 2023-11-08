import { Request, Response } from "express";
import createAuthService from "../../services/trainerServices/trainerAuthService";
import { SignupRequestBody, LoginRequestBody } from "../../types/commonTypes";
import cloudinary from "../../config/cloudinaryConfig";


const authService = createAuthService();

export const signupTrainerController = async (req: Request, res: Response) => {
  try {
    
    const { firstName, lastName , email, password }: SignupRequestBody = req.body;
    const uploadedImages = req.files as Express.Multer.File[]; 
    
    if (!uploadedImages.length) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const cloudinaryResponses : any = await Promise.all(
      uploadedImages.map(async (uploadedImage) => {
        const base64Image = uploadedImage.buffer.toString('base64');

        const cloudinaryResponse = await cloudinary.uploader.upload(`data:${uploadedImage.mimetype};base64,${base64Image}`, {
          public_id: `fitbuddy/${uploadedImage.originalname}`,
          resource_type: 'image',
        });

        return cloudinaryResponse.secure_url
      })
    );
    const newTrainer = await authService.signupTrainer( firstName , lastName, email, password , cloudinaryResponses );

    res
      .status(201)
      .json({ message: "Trainer signup successful", trainer: newTrainer });
  } catch (error:any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const loginTrainerController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequestBody = req.body;
    const { token, trainer } = await authService.loginTrainer(email, password);
    res
      .status(200)
      .json({ message: "Trainer login successful", token, trainer });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error:error.message });
  }
};
