const express = require('express');
const { z } = require('zod');

const { validateBody } = require('../middleware/validate');
const authController = require('../controllers/authController');

const router = express.Router();

const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(72)
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(72)
});

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);

module.exports = router;

