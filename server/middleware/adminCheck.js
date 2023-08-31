module.exports = (req, res, next) => {
  const userRole = req.header('Role'); // Get the user's role from the headers

  if (userRole == 'Admin') {
    next();
    } else {
      res.status(403).json({ error: 'Access denied! Admin role only' });
    }
  };
  