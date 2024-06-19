const globalError = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: true,
    message: err.message,
  });
};

export default globalError;
