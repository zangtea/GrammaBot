const express = require('express');
const { z } = require('zod');

const { requireAuth } = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const aiController = require('../controllers/aiController');

const router = express.Router();

const grammarSchema = z.object({
  query: z.string().trim().min(1).max(20000)
});

router.post('/grammar', requireAuth, validateBody(grammarSchema), aiController.explainGrammar);

module.exports = router;