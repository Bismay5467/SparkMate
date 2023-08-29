class ErrorHandler extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const globalErrorHandler = (error, _req, res, _next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";
  res.status(error.statusCode).json({ message: error.message, success: false });
};

export { globalErrorHandler, ErrorHandler };
