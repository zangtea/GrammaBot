const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || typeof header !== 'string') {
    return next(new ApiError(401, 'Missing Authorization header'));
  }

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Invalid Authorization header format'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}

module.exports = { requireAuth };

