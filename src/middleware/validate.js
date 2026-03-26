const { ZodError } = require('zod');
const { ApiError } = require('../utils/ApiError');

function formatZodError(err) {
  return err.issues.map((i) => ({
    path: i.path.join('.'),
    message: i.message
  }));
}

function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new ApiError(400, 'Invalid request body', { errors: formatZodError(err) }));
      }
      return next(err);
    }
  };
}

function validateParams(schema) {
  return (req, res, next) => {
    try {
      req.params = schema.parse(req.params);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new ApiError(400, 'Invalid request params', { errors: formatZodError(err) }));
      }
      return next(err);
    }
  };
}

module.exports = { validateBody, validateParams };

