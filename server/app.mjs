import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';

import { EXIT_FAILURE } from './common/constants.mjs';

import { ERROR_CODES } from './common/statusCode.mjs';
import { ChatRouter, SeedRouter } from './routes/index.mjs';
import { ErrorHandler, globalErrorHandler } from './utils/errorHandler.mjs';

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(error.name, error.message);
  process.exit(EXIT_FAILURE);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression({ level: 6, threshold: 1000 }));

if (NODE_ENV === 'development') app.use('/api/seed/chats', SeedRouter);

app.use('/api/chats', ChatRouter);

app.all('*', (req, _res, next) => {
  next(
    new ErrorHandler(
      `Route ${req.originalUrl} not found!`,
      ERROR_CODES['NOT FOUND']
    )
  );
});

app.use(globalErrorHandler);

export default app;
