const express = require('express');
const { z } = require('zod');

const { requireAuth } = require('../middleware/auth');
const { validateBody, validateParams } = require('../middleware/validate');
const vocabController = require('../controllers/vocabController');

const router = express.Router();

const addVocabSchema = z.object({
  word: z.string().trim().min(1).max(128),
  phonetic: z.string().trim().min(1).max(128).optional().nullable(),
  definition: z.string().trim().min(1).max(2000)
});

const userIdParams = z.object({
  userId: z.coerce.number().int().positive()
});

const idParams = z.object({
  id: z.coerce.number().int().positive()
});

router.post('/', requireAuth, validateBody(addVocabSchema), vocabController.addWord);
router.get('/:userId', requireAuth, validateParams(userIdParams), vocabController.getByUser);
router.patch('/:id/learned', requireAuth, validateParams(idParams), vocabController.markLearned);

module.exports = router;

