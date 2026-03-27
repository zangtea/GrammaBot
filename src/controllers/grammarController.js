const grammarService = require('../services/grammarService');

async function saveHistory(req, res, next) {
  try {
    const userId = Number(req.user.id);
    const created = await grammarService.saveHistory(userId, req.body);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
}

async function getHistoryByUser(req, res, next) {
  try {
    const userId = Number(req.user.id);
    const items = await grammarService.getByUser(userId, req.params.userId);
    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
}

module.exports = { saveHistory, getHistoryByUser };

