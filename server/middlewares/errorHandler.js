module.exports = (err, req, res, next) => {
  let status;
  let message;
  let arrs = []
  switch (err.name) {
    case 'ValidationError':
      status = 400;
      for (let i in err.errors) {
        arrs.push(err.errors[i].message);
      }
      message = 'Validation Error';
      break;
    case 'JsonWebTokenError':
      status = 401;
      message = err.message;
      break;
    default:
      status = err.status || 500;
      message = err.message || 'Internal Server Error';
      break;
  }
  res.status(status).json({
    status,
    message,
    errors: arrs
  });
}