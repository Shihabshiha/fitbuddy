
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const registrationValidationCheck = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .trim(),

  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .trim(),  

  body('email')
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: 'Validation failed' });
    }
    next();
  }
];

export const loginValidationCheck = [
  body('email')
    .isEmail(),
  
  body('password') 
    .isLength({ min: 4 }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: 'Login Validation failed' });
    }
    next();
  }  
]
