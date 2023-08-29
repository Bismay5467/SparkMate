require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";

import { globalErrorHandler, ErrorHandler } from "./utils/errorHandler";
import { ERROR_CODES } from "./common/statusCode";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(error.name, error.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression({ level: 6, threshold: 1000 }));

app.all("*", (req, _res, next) => {
  next(new ErrorHandler(`Route ${req.originalUrl} not found!`, ERROR_CODES["NOT FOUND"]));
});

app.use(globalErrorHandler);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(error.name, error.message);
  server.close(() => process.exit(1));
});
