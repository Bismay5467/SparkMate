import mongoose from 'mongoose';

import { ErrorHandler } from '../../utils/errorHandler.mjs';
import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import { MessageCollection } from '../../model/index.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import connectDB from '../../config/database.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

/*
MESSAGE ARRAY STRUCTURE :

[
  {
    userID // sender of the message
    inboxID
    message
    status
  }
]

*/

const chatsBackup = asyncHandler(async (req, res, next) => {
  const { messageArray: messages } = req.body;

  await connectDB();

  const response = await MessageCollection.insertMany(messages)
    .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
    .lean()
    .exec();

  if (Array.isArray(response) && response.length !== messages.length) {
    return next(
      new ErrorHandler(
        "The melody of your chats was lost in the night's whispers! 🌙💔 Backup of chats failed.",
        ERROR_CODES['PAYLOAD TOO LARGE']
      )
    );
  }

  await mongoose.disconnect();

  return res.status(SUCESS_CODES.OK).json({
    message:
      'Our love story, preserved in the digital whispers of our chats, remains intact! 💕📜',
    success: true,
  });
});

export default chatsBackup;
