module.exports = (req, res, next) => {
    if (req.user.role === 'Admin') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };
  