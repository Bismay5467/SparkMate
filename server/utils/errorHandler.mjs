import { SERVER_ERROR } from '../common/statusCode.mjs';

class ErrorHandler extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const globalErrorHandler = (error, _req, res) => {
  const statusCode = error.statusCode || SERVER_ERROR['INTERNAL SERVER ERROR'];
  const message = error.message || 'Internal Server Error';
  res.status(statusCode).json({ message, success: false });
};

export { globalErrorHandler, ErrorHandler };
