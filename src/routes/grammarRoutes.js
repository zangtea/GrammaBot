const express = require('express');
const { z } = require('zod');

const { requireAuth } = require('../middleware/auth');
const { validateBody, validateParams } = require('../middleware/validate');
const grammarController = require('../controllers/grammarController');

const router = express.Router();

const createSchema = z.object({
  query: z.string().trim().min(1).max(20000),
  response: z.string().trim().min(1).max(200000)
});

const userIdParams = z.object({
  userId: z.coerce.number().int().positive()
});

router.post('/', requireAuth, validateBody(createSchema), grammarController.saveHistory);
router.get('/:userId', requireAuth, validateParams(userIdParams), grammarController.getHistoryByUser);

module.exports = router;

