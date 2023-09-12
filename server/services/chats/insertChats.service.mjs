import mongoose from 'mongoose';

import { MessageCollection } from '../../model/index.mjs';
import connectDB from '../../config/database.config.mjs';

const InsertChats = async (messages) => {
  try {
    await connectDB();

    const options = { lean: true, throwOnValidationError: true };

    const response = await MessageCollection.insertMany(messages, options);

    await mongoose.disconnect();

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default InsertChats;
