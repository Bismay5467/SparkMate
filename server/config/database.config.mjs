import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { DEFAULT_DB_CONFIG, MONGO_URI as URI } from './default.config.mjs';

dotenv.config();

const connectDB = async () => {
  const { MONGO_MAX_POOLSIZE, MONGO_TIMEOUT_MS } = DEFAULT_DB_CONFIG;

  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: MONGO_MAX_POOLSIZE,
      wtimeoutMS: 2500,
      connectTimeoutMS: MONGO_TIMEOUT_MS,
    })
    // eslint-disable-next-line no-console
    .then(() => console.log('Connected to DB!'))
    .catch((err) => console.error(err.message));
};

export default connectDB;
