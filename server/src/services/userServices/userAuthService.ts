import bcrypt from "bcrypt";
import UserModel from "../../models/userModel";
import { generateJwtToken } from "../../middlewares/jwtAuth";
import nodemailer, { Transporter } from 'nodemailer';
import config from "../../config/config";
import { log } from "console";
import { GoogleUserPayload , User } from "../../types/userTypes";

const SALT_ROUNDS = 10;

const createAuthService = ()=>{

  
  const userSignup = async (
    firstName: string,
    lastName:string,
    email: string,
    password: string
  ) => {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error("Email already registered");
      }
    
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const isBlocked :boolean = false

      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isBlocked
      });
      return newUser;
    } catch (error: any) {
      throw error
    }
  };

  const userLogin = async (email: string, password: string) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = generateJwtToken({ id: user._id.toString() , role:'user' });
      return { token, user };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  let otp:string|null;

  const sendOtp = async (email : string) =>{
    try{
      const transporter : Transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
          user : config.EMAIL_NODE_MAILER,
          pass : config.EMAIL_PASSWORD
        }
      })

      otp = Math.floor(10000 + Math.random() * 900000).toString();

      setTimeout(()=>{
        otp = null
      },120000)
  
      const mailOptions = {
        from: config.EMAIL_NODE_MAILER,
        to: email,
        subject: 'OTP for Login',
        text: `Your OTP for login is: ${otp}`,
      };
  
      transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
      });
    }catch(error:any){
      throw new Error(error.message);
    }
  }

  const verifyOtp = async (enteredOtp : string) => {
    try{
      if(enteredOtp === otp){
        return {message:'OTP verified'}
      }else if( otp === null){
        return {message: 'OTP expired'}
      }else{
        return {message: 'Invalid OTP'}
      }
    }catch(error:any){
      throw new Error(error.message);
    }
  }

  interface GoogleLoginResult {
    user: User;
    token: string;
  }

  const googleLogin = async (userData:GoogleUserPayload): Promise<GoogleLoginResult> => {
    try{
      const { given_name, family_name, email } = userData;
      let user = await UserModel.findOne({ email });

      if(!user){
        const newUser = await UserModel.create({
          firstName : given_name,
          lastName : family_name,
          email : email,
          isBlocked : false,
        })
        const token = generateJwtToken({ id: newUser._id.toString(), role: 'user' });
        console.log('new user')
        return { token, user: newUser };
      }
      console.log('old user')
      const token = generateJwtToken({ id: user._id.toString() , role:'user' });
      return { token, user}
    }catch(error:any){
      throw error
    }
  }





  return {
    userSignup,
    userLogin,
    sendOtp,
    verifyOtp,
    googleLogin,
  }
  
}

export default createAuthService;
