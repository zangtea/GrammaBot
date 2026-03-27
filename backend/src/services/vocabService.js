const { prisma } = require('../config/prisma');
const { ApiError } = require('../utils/ApiError');
const { askGemini } = require('./ai.service');

function assertOwner(authUserId, targetUserId) {
  if (!Number.isInteger(authUserId) || authUserId <= 0) {
    throw new ApiError(401, 'Unauthorized');
  }
  if (authUserId !== targetUserId) {
    throw new ApiError(403, 'Forbidden');
  }
}

async function generateVocabInfo(word) {
  const prompt = `Explain the word "${word}" in detail. Provide:
1. IPA phonetic transcription
2. English meaning
3. Vietnamese meaning
4. Two example sentences

Format your response as JSON:
{
  "phonetic": "IPA here",
  "enMeaning": "English meaning",
  "viMeaning": "Vietnamese meaning",
  "examples": ["Example 1", "Example 2"]
}`;

  const response = await askGemini(prompt);
  try {
    const parsed = JSON.parse(response);
    return {
      phonetic: parsed.phonetic,
      definition: `${parsed.enMeaning} | ${parsed.viMeaning}`,
      examples: parsed.examples.join('; ')
    };
  } catch (error) {
    throw new ApiError(500, 'Failed to parse AI response');
  }
}

async function addWord(authUserId, { word, phonetic, definition }) {
  const user = await prisma.user.findUnique({ where: { id: authUserId }, select: { id: true } });
  if (!user) throw new ApiError(404, 'User not found');

  let vocabData = { word, phonetic, definition, examples: null };

  if (!phonetic || !definition) {
    const aiData = await generateVocabInfo(word);
    vocabData = {
      word,
      phonetic: phonetic || aiData.phonetic,
      definition: definition || aiData.definition,
      examples: aiData.examples
    };
  }

  const created = await prisma.vocabulary.create({
    data: {
      ...vocabData,
      userId: authUserId
    },
    select: {
      id: true,
      word: true,
      phonetic: true,
      definition: true,
      examples: true,
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
      examples: true,
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

