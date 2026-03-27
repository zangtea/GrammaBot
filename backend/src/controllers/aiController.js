const { askGemini } = require('../services/ai.service');
const { prisma } = require('../config/prisma');
const { ApiError } = require('../utils/ApiError');

async function explainGrammar(req, res, next) {
  try {
    const userId = Number(req.user.id);
    const { query } = req.body;

    const prompt = `Explain the grammar point: "${query}". Provide a clear explanation and include 2-3 example sentences. Structure your response as JSON:
{
  "explanation": "Clear explanation here",
  "examples": ["Example 1", "Example 2", "Example 3"]
}`;

    const aiResponse = await askGemini(prompt);
    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (error) {
      throw new ApiError(500, 'Failed to parse AI response');
    }

    const responseText = `${parsed.explanation}\n\nExamples:\n${parsed.examples.join('\n')}`;

    const created = await prisma.grammarHistory.create({
      data: {
        query,
        response: responseText,
        userId
      },
      select: {
        id: true,
        query: true,
        response: true,
        userId: true,
        createdAt: true
      }
    });

    return res.status(201).json({
      explanation: parsed.explanation,
      examples: parsed.examples
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { explainGrammar };