const vocabService = require('../services/vocabService');

async function addWord(req, res, next) {
  try {
    const userId = Number(req.user.id);
    const created = await vocabService.addWord(userId, req.body);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

async function getByUser(req, res, next) {
  try {
    const userId = Number(req.user.id);
    const requestedUserId = Number(req.params.userId);
    if (userId !== requestedUserId) {
      return next(new (require('../utils/ApiError'))(403, 'Access denied'));
    }
    const items = await vocabService.getByUser(userId, requestedUserId);
    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
}

async function markLearned(req, res, next) {
  try {
    const userId = Number(req.user.id);
    const updated = await vocabService.markLearned(userId, req.params.id);
    return res.status(200).json(updated);
  } catch (err) {
    return next(err);
  }
}

module.exports = { addWord, getByUser, markLearned };

