"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainerRegistrationValidationCheck = exports.loginValidationCheck = exports.userRegistrationValidationCheck = void 0;
const express_validator_1 = require("express-validator");
exports.userRegistrationValidationCheck = [
    (0, express_validator_1.body)('firstName')
        .notEmpty().withMessage('First name is required')
        .trim(),
    (0, express_validator_1.body)('lastName')
        .notEmpty().withMessage('Last name is required')
        .trim(),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: 'Validation failed' });
        }
        next();
    }
];
exports.loginValidationCheck = [
    (0, express_validator_1.body)('email')
        .isEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 4 }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: 'Login Validation failed' });
        }
        next();
    }
];
exports.trainerRegistrationValidationCheck = [
    (0, express_validator_1.body)('firstName')
        .notEmpty().withMessage('First name is required')
        .trim(),
    (0, express_validator_1.body)('lastName')
        .notEmpty().withMessage('Last name is required')
        .trim(),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    (req, res, next) => {
        if (!req.files) {
            return res.status(400).json({ error: 'Certificates file is required' });
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: 'Validation failed' });
        }
        next();
    }
];
