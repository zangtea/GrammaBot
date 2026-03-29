const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Prisma } = require('@prisma/client');

const { prisma } = require('../config/prisma');
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

async function register({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  let user;
  try {
    user = await prisma.user.create({
      data: { name: name.trim(), email: normalizedEmail, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true }
    });
  } catch (err) {
    // Handle unique race condition when concurrent requests register same email.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ApiError(409, 'Email already registered');
    }
    throw err;
  }

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
    user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
    token
  };
}

module.exports = { register, login };

