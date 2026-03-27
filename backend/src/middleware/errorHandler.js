const { ApiError } = require('../utils/ApiError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const statusCode = err instanceof ApiError && err.statusCode ? err.statusCode : 500;
  const message = err instanceof ApiError && err.message ? err.message : 'Internal Server Error';

  const payload = { message };
  if (err instanceof ApiError && err.details !== undefined) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV === 'development' && statusCode === 500) {
    payload.stack = err && err.stack ? err.stack : undefined;
  }

  return res.status(statusCode).json(payload);
}

module.exports = { errorHandler };

