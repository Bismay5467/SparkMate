import mongoose from 'mongoose';

import { InboxCollection } from '../../../model/index.mjs';
import asyncHandler from '../../../utils/asyncHandler.mjs';
import connectDB from '../../../config/database.config.mjs';
import { inbox1, inbox2, inbox3 } from '../../../mocks/chats/inbox.mocks.mjs';

const SUCCESSS_STATUS_CODE = 200;

const insertInboxData = asyncHandler(async (req, res) => {
  await connectDB();

  const response = await InboxCollection.insertMany([inbox1, inbox2, inbox3]);
  // eslint-disable-next-line no-console
  console.log(response);
  await mongoose.disconnect();

  res
    .status(SUCCESSS_STATUS_CODE)
    .json({ message: 'data inserted successfully.', success: true });
});

export default insertInboxData;
