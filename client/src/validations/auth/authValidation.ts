import { object, string, ref } from "yup";


export const userRegistrationValidationSchema = object().shape({
  firstName: string().trim().required("First Name is required").min(4, 'First name should be at least 4 characters'),
  lastName: string().trim().required("Last Name is required"),
  email: string().email("Invalid email").trim().required("Email is required"),
  password: string().required("Password is required").min(4, 'Password should be at least 4 characters'),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginValidationSchema = object().shape({
  email: string().email("Invalid email").trim().required("Email is required"),
  password: string().required("Password is required"),
});

export const TrainerRegisterValidationSchema = object().shape({
  firstName: string().required('First Name is required'),
  lastName: string().required('First Name is required'),
  email: string().email('Invalid email address').required('Email is required'),
  password: string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});