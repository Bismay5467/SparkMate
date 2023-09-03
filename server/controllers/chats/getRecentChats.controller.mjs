import mongoose from 'mongoose';

// eslint-disable-next-line import/no-named-default
import { default as Chats } from '../../model/chat.model.mjs';
import { ErrorHandler } from '../../utils/errorHandler.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import connectDB from '../../config/database.mjs';

import {
  CHAT_BATCH_SIZE_FETCH,
  MAX_QUERY_EXEC_TIME_MS,
} from '../../common/constants.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

const getRecentChats = asyncHandler(async (req, res, next) => {
  const { sender, receiver } = req.params;
  const { page } = req.query;

  await connectDB();

  const query = { sender, receiver };
  const projection = { chats: 1, _id: 0 };

  const allChats = await Chats.findOne(query)
    .select(projection)
    .sort({ 'chats.timestamp': -1 })
    .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
    .exec();

  if (!allChats || Object.keys(allChats).length === 0) {
    return next(
      new ErrorHandler(
        'No chats found between the participants.',
        ERROR_CODES['NOT FOUND']
      )
    );
  }

  const batchSize = CHAT_BATCH_SIZE_FETCH;
  const { chats } = allChats;

  const startIndex = (page - 1) * batchSize;
  const endIndex = startIndex + batchSize;

  const paginatedChats = chats.slice(startIndex, endIndex);

  const hasMore = chats.length > endIndex;

  await mongoose.disconnect();

  return res
    .status(SUCESS_CODES.OK)
    .json({ chats: paginatedChats, hasMore, success: true });
});

export default getRecentChats;
