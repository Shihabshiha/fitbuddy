import express from 'express';
import { signupTrainerController , loginTrainerController } from '../controllers/trainerControllers/trainerAuthController';
import { registrationValidationCheck , loginValidationCheck } from '../middlewares/validation';

const router = express.Router();

// Signup&login route for trainers
router.post('/signup', registrationValidationCheck , signupTrainerController);
router.post('/login', loginValidationCheck , loginTrainerController)
 


export default router;

