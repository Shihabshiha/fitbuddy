
import jwt from "jsonwebtoken";
import { Response, NextFunction , RequestHandler} from "express";
import { CustomRequest } from "../types/custom-request";
import { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import UserModel from "../models/userModel";
import TrainerModel from "../models/trainerModel";

const JWT_SECRET = config.jwtSecret;

export const generateJwtToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });
};

const extractTokenFromHeader = (req: CustomRequest): string | null => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    return authorizationHeader.split(" ")[1];
  }
  return null;
};




const verifyToken = async (token: string): Promise<any> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error:any) {
    throw error;
  }
};

export const authenticateJwtToken 
 = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req);
    
    if (!token) {
      res.status(401).json({ error:'Authentication required'});
      return;
    }
    
    const payload: any = await verifyToken(token);
 
    req.person = payload;
    const role = payload.role;
    
    if(role === 'users'){
      const userId = payload.id;
      const user = await UserModel.findById(userId)
      if(user && user.isBlocked){
        res.status(403).json({ error: "Blocked User" });
        return;
      }
    }else if(role === 'trainers'){
      const trainerId = payload.id;
      const trainer = await TrainerModel.findById(trainerId)
      if(trainer && trainer.isBlocked){
        res.status(403).json({ error: "Blocked Trainer" });
        return;
      }
    }
    
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      // Token has expired
      res.status(401).json({ error: "Token has expired"});
    } else if (err instanceof jwt.JsonWebTokenError) {
      // Other JWT verification errors
      res.status(401).json({ error: "Token verification failed" });
    } else {
      // Other unexpected errors
      console.error("JWT Auth Middleware - Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
