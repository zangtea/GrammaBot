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

async function addWord(authUserId, { word, phonetic, definition }) {
  if (!Number.isInteger(authUserId) || authUserId <= 0) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await prisma.user.findUnique({ where: { id: authUserId }, select: { id: true } });
  if (!user) throw new ApiError(404, 'User not found');

  const created = await prisma.vocabulary.create({
    data: {
      word,
      phonetic: phonetic ?? null,
      definition,
      userId: authUserId
    },
    select: {
      id: true,
      word: true,
      phonetic: true,
      definition: true,
      learned: true,
      userId: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return created;
}

async function getByUser(authUserId, targetUserId) {
  assertOwner(authUserId, targetUserId);

  const user = await prisma.user.findUnique({ where: { id: authUserId }, select: { id: true } });
  if (!user) throw new ApiError(404, 'User not found');

  const items = await prisma.vocabulary.findMany({
    where: { userId: authUserId },
    orderBy: [{ learned: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      word: true,
      phonetic: true,
      definition: true,
      learned: true,
      userId: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return items;
}

async function markLearned(authUserId, vocabId) {
  if (!Number.isInteger(authUserId) || authUserId <= 0) {
    throw new ApiError(401, 'Unauthorized');
  }

  const existing = await prisma.vocabulary.findUnique({
    where: { id: vocabId },
    select: { id: true, userId: true }
  });
  if (!existing) throw new ApiError(404, 'Vocabulary not found');
  if (existing.userId !== authUserId) throw new ApiError(403, 'Forbidden');

  const updated = await prisma.vocabulary.update({
    where: { id: vocabId },
    data: { learned: true },
    select: {
      id: true,
      word: true,
      phonetic: true,
      definition: true,
      learned: true,
      userId: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return updated;
}

module.exports = { addWord, getByUser, markLearned };

