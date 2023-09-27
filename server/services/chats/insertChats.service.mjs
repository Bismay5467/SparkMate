import mongoose from 'mongoose';

import { MessageCollection } from '../../model/index.mjs';
import connectDB from '../../config/database.config.mjs';

const InsertChats = async (messages) => {
  try {
    await connectDB();

    const options = { lean: true, throwOnValidationError: true };

    const response = await MessageCollection.insertMany(messages, options);

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    // eslint-disable-next-line no-console
    await mongoose.disconnect(() => console.log('Database connection closed!'));
  }
};

export default InsertChats;
