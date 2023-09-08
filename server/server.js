import dotenv from 'dotenv';
import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';

import { DEFAULT_DEV_PORT, EXIT_FAILURE } from './common/constants.mjs';

// eslint-disable-next-line import/no-named-default
import { default as ChatRoutes } from './routes/chats/routes.mjs';
import { ERROR_CODES } from './common/statusCode.mjs';
import { ErrorHandler, globalErrorHandler } from './utils/errorHandler.mjs';

dotenv.config();
const app = express();

const PORT = Number(process.env.DEV_PORT) || DEFAULT_DEV_PORT;

process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(error.name, error.message);
  process.exit(EXIT_FAILURE);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression({ level: 6, threshold: 1000 }));

app.use('/chats', ChatRoutes);

app.all('*', (req, _res, next) => {
  next(
    new ErrorHandler(
      `Route ${req.originalUrl} not found!`,
      ERROR_CODES['NOT FOUND']
    )
  );
});

app.use(globalErrorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

process.on('unhandledRejection', (error) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(error.name, error.message);
  app.close(() => process.exit(EXIT_FAILURE));
});
