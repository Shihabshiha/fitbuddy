import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { trainerRegistrationValidationCheck , loginValidationCheck } from '../middlewares/validation';
import upload from '../config/multerConfig';

const router = express.Router();

// Signup&login route for trainers
router.post('/register', upload, trainerRegistrationValidationCheck , signupTrainerController);
router.post('/login', loginValidationCheck , loginTrainerController)

 


export default router;

