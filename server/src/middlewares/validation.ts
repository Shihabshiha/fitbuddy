import multer from 'multer'
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userRegistrationValidationCheck = [
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

export const trainerRegistrationValidationCheck = [
  
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
    console.log(req.file)
    console.log(req.files)
    if (!req.files) {
      console.log('req.files is not here')
      return res.status(400).json({ error: 'Certificates file is required' });
    }
    console.log('Validation successful');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array()); // Log validation errors
      return res.status(400).json({ errors: 'Validation failed' });
    }
    next();
  } 
];
