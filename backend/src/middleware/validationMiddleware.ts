// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg
      }))
    });
  }
  
  next();
};

/**
 * Validation rules for user registration
 */
export const validateSignup = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .trim(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  
  handleValidationErrors
];

/**
 * Validation rules for user login
 */
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .trim(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

/**
 * Validation rules for SOS alert creation
 */
export const validateSOSAlert = [
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
    .escape(), // Prevent XSS
  
  body('emergencyType')
    .optional()
    .isIn(['medical', 'crime', 'accident', 'fire', 'other'])
    .withMessage('Invalid emergency type'),
  
  handleValidationErrors
];

/**
 * Validation rules for place search/creation
 */
export const validatePlace = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Place name must be between 2 and 100 characters')
    .escape(),
  
  body('type')
    .isIn(['hospital', 'pharmacy', 'police_station', 'fire_station', 'safe_zone'])
    .withMessage('Invalid place type'),
  
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address cannot exceed 200 characters')
    .escape(),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Invalid phone number'),
  
  handleValidationErrors
];

/**
 * Validation rules for AI chat
 */
export const validateAIChat = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty')
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
    .escape(), // Prevent XSS and prompt injection
  
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  
  handleValidationErrors
];

/**
 * Validation rules for getting nearby places
 */
export const validateNearbyPlaces = [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  
  query('radius')
    .optional()
    .isInt({ min: 100, max: 50000 })
    .withMessage('Radius must be between 100 and 50000 meters'),
  
  query('type')
    .optional()
    .isIn(['hospital', 'pharmacy', 'police_station', 'fire_station', 'safe_zone', 'all'])
    .withMessage('Invalid place type'),
  
  handleValidationErrors
];

/**
 * Validation rules for MongoDB ObjectId parameters
 */
export const validateObjectId = [
  param('id')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Invalid ID format'),
  
  handleValidationErrors
];

/**
 * Validation rules for updating user profile
 */
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  
  body('emergencyContacts')
    .optional()
    .isArray({ max: 5 })
    .withMessage('You can add up to 5 emergency contacts'),
  
  body('emergencyContacts.*.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Contact name must be between 2 and 50 characters'),
  
  body('emergencyContacts.*.phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Contact phone must be 10 digits'),
  
  handleValidationErrors
];

/**
 * Sanitize and validate pagination parameters
 */
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  
  handleValidationErrors
];