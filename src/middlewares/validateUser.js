const jwt = require('jsonwebtoken');
const env = require('../base/env');

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, env.TOP_SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};
