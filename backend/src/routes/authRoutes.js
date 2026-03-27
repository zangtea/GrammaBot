const express = require('express');
const { z } = require('zod');

const { validateBody } = require('../middleware/validate');
const authController = require('../controllers/authController');

const router = express.Router();

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email(),
  password: z.string().min(6).max(72)
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(72)
});

const updateProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional(),
  password: z.string().min(6).max(72).optional()
});

const { requireAuth } = require('../middleware/auth');

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.get('/me', requireAuth, authController.me);
router.put('/me', requireAuth, validateBody(updateProfileSchema), authController.updateProfile);

module.exports = router;

