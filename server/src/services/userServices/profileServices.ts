import UserModel from "../../models/userModel";
import cloudinary from "../../config/cloudinaryConfig";

export const changeProfileImageService = async(userId:string,profileImage:Express.Multer.File) => {
  try{

    const user = UserModel.findById(userId);

    if(!user){
      throw new Error('User not found')
    }

    const base64String = profileImage.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${profileImage.mimetype};base64,${base64String}`,
      {
        folder: "fitbuddy/profile-image",
      }
    );
    const profileUrl = uploadResponse.secure_url;
    
    const filter = { _id : userId }
    const update = { $set: { profileImage: profileUrl } }
    const options = { new : true }
    const result = await UserModel.findOneAndUpdate( filter , update , options)
    return result;
  }catch(error:any){
    console.error(error)
    throw error
  }
}