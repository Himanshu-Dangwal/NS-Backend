const jwt = require('jsonwebtoken');
const JWT_SECRET = 'newtonSchool';

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Authentication failed: Missing token.',
      status: 'error',
    });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: 'Authentication failed: Missing token.',
          status: 'error',
        });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Authentication failed: Invalid token.',
      status: 'error',
    });
  }
}

module.exports = isLoggedIn;
