// src/middleware/rateLimitMiddleware.ts
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import type { Request, Response } from 'express';

/**
 * Helper: Safe key generator using user ID or IPv4/IPv6
 */
const safeKeyGenerator = (req: Request): string => {
  try {
    // Prefer authenticated user ID
    const userId = (req as any).user?.id;
    if (userId) return userId;

    // Use express-rate-limit’s built-in IPv6-safe helper
    return ipKeyGenerator(req as any);
  } catch {
    return 'unknown';
  }
};

/**
 * Generic rate limit handler
 */
const rateLimitHandler = (req: Request, res: Response) => {
  res.status(429).json({
    success: false,
    message: 'Too many requests, please try again later.',
    retryAfter: res.getHeader('Retry-After')
  });
};

// --- LIMITERS ---

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Too many accounts created, please try again after an hour.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const sosLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message:
    'SOS alert limit reached. If this is a genuine emergency, please call emergency services directly.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: safeKeyGenerator,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'SOS alert limit reached for your account.',
      emergencyNote:
        'If this is a genuine emergency, please call 112 (India) or your local emergency number immediately.',
      retryAfter: res.getHeader('Retry-After')
    });
  }
});

export const aiChatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: 'AI chat limit reached. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: safeKeyGenerator,
  handler: rateLimitHandler
});

export const placesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: 'Too many map requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: safeKeyGenerator,
  handler: rateLimitHandler
});

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Too many password reset attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const emailVerificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many verification email requests, please check your inbox.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler
});
