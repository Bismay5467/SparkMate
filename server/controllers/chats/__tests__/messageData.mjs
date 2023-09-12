import mongoose from 'mongoose';

import { MessageCollection } from '../../../model/index.mjs';
import asyncHandler from '../../../utils/asyncHandler.mjs';
import connectDB from '../../../config/database.config.mjs';
import {
  message1,
  message2,
  message3,
} from '../../../mocks/chats/message.mocks.mjs';

const SUCCESSS_STATUS_CODE = 200;

const insertMessageData = asyncHandler(async (req, res) => {
  await connectDB();

  const response = await MessageCollection.insertMany([
    message1,
    message2,
    message3,
  ]);
  // eslint-disable-next-line no-console
  console.log(response);
  await mongoose.disconnect();

  res
    .status(SUCCESSS_STATUS_CODE)
    .json({ message: 'data inserted successfully.', success: true });
});

export default insertMessageData;
