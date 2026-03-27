const { prisma } = require('../config/prisma');
const { ApiError } = require('../utils/ApiError');

function assertOwner(authUserId, targetUserId) {
  if (!Number.isInteger(authUserId) || authUserId <= 0) {
    throw new ApiError(401, 'Unauthorized');
  }
  if (authUserId !== targetUserId) {
    throw new ApiError(403, 'Forbidden');
  }
}

async function saveHistory(authUserId, { query, response }) {
  const user = await prisma.user.findUnique({ where: { id: authUserId }, select: { id: true } });
  if (!user) throw new ApiError(404, 'User not found');

  const created = await prisma.grammarHistory.create({
    data: {
      query,
      response,
      userId: authUserId
    },
    select: {
      id: true,
      query: true,
      response: true,
      userId: true,
      createdAt: true
    }
  });

  return created;
}

async function getByUser(authUserId, targetUserId) {
  assertOwner(authUserId, targetUserId);

  const user = await prisma.user.findUnique({ where: { id: authUserId }, select: { id: true } });
  if (!user) throw new ApiError(404, 'User not found');

  const items = await prisma.grammarHistory.findMany({
    where: { userId: authUserId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      query: true,
      response: true,
      userId: true,
      createdAt: true
    }
  });

  return items;
}

module.exports = { saveHistory, getByUser };

