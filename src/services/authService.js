const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const  prisma  = require('../config/prisma');
const { ApiError } = require('../utils/ApiError');

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new ApiError(500, 'JWT_SECRET is not configured');

  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    { email: user.email },
    secret,
    {
      subject: String(user.id),
      expiresIn
    }
  );
}

async function register({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email: normalizedEmail, password: hashedPassword },
    select: { id: true, email: true, createdAt: true }
  });

  const token = signToken(user);

  return { user, token };
}

async function login({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user);

  return {
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    token
  };
}

module.exports = { register, login };

