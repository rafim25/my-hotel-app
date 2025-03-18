const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized Access',
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      message: 'Access Forbidden',
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      message: 'Resource Not Found',
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

module.exports = errorHandler; 