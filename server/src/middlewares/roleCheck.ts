import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  person?: {
    Id: string;
    role: string;
  };
}

export const adminRoleChecking = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = req.person?.role;

  if (role == "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied, Unauthorised" });
  }
};
