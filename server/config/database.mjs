import dotenv from 'dotenv';
import mongoose from 'mongoose';

import {
  DEFAULT_MAX_POOL_SIZE,
  DEFAULT_MONGO_TIMEOUT_MS,
} from '../common/constants.mjs';

dotenv.config();

const {
  MONGO_MAX_POOLSIZE,
  MONGO_TIMEOUT_MS,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
} = process.env;

const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.usbeazf.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: Number(MONGO_MAX_POOLSIZE) || DEFAULT_MAX_POOL_SIZE,
      wtimeoutMS: 2500,
      connectTimeoutMS: Number(MONGO_TIMEOUT_MS) || DEFAULT_MONGO_TIMEOUT_MS,
    })
    // eslint-disable-next-line no-console
    .then(() => console.log('Connected to DB!'))
    .catch((err) => console.error(err.message));
};

export default connectDB;
