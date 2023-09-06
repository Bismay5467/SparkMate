import mongoose from 'mongoose';

import { ErrorHandler } from '../../utils/errorHandler.mjs';
import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import connectDB from '../../config/database.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';
import {
  inbox as InboxCollection,
  messages as MessagesCollection,
} from '../../model/chats/chat.model.mjs';

const deleteChats = asyncHandler(async (req, res, next) => {
  const { inboxID } = req.params;

  await connectDB();

  const inboxQuery = { _id: inboxID };

  const isInboxDataDeleted = await InboxCollection.deleteOne(inboxQuery)
    .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
    .lean()
    .exec();

  if (isInboxDataDeleted.n === 0 || isInboxDataDeleted.ok === 0) {
    return next(
      new ErrorHandler(
        'Could not delete inbox data matching the given inboxID.',
        ERROR_CODES['BAD REQUEST']
      )
    );
  }

  const messagesQuery = { inboxID };

  const isChatsDeleted = await MessagesCollection.deleteMany(messagesQuery)
    .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
    .lean()
    .exec();

  if (isChatsDeleted.deletedCount === 0) {
    return next(
      new ErrorHandler(
        'Could not delete the chats matching the given inboxID.',
        ERROR_CODES['NOT FOUND']
      )
    );
  }

  await mongoose.disconnect();

  return res
    .status(SUCESS_CODES.OK)
    .json({ message: 'Chats deleted successfully', success: true });
});

export default deleteChats;
