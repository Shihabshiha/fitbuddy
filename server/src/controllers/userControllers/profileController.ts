import { Request, Response} from "express";
import { CustomRequest } from "../../types/custom-request";
import { changeProfileImageService } from "../../services/userServices/profileServices";

const profileControllerFunction = () => {

  const changeProfileImage = async(req:Request, res:Response) => {
    const userId  = (req as CustomRequest).person?.id;
    const imageFile = req.file as Express.Multer.File;
    console.log('user called',userId)
    try{
      if(userId){
        const response = await changeProfileImageService(userId,imageFile);
        res.status(200).json({response})
      }
    }catch(error:any){
      res.status(500).json({error:'Internal Server Error'})
    }
  }

  return {
    changeProfileImage,
  }
}

export default profileControllerFunction