import mongoose from 'mongoose';

import { InboxCollection } from '../../model/index.mjs';
import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import connectDB from '../../config/database.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

const deleteChats = asyncHandler(async (req, res) => {
  const { inboxID } = req.params;

  // inboxID : 64fc0e7821263725c66c1293

  await connectDB();

  const inboxQuery = { _id: inboxID };

  const isInboxDataDeleted = await InboxCollection.deleteOne(inboxQuery)
    .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
    .exec();

  if (isInboxDataDeleted.deletedCount === 0) {
    return res.status(ERROR_CODES['NOT FOUND']).json({
      message:
        "Love's thread remains unbroken! ❤️💌 Could not delete inbox data.",
      success: false,
    });
  }

  await mongoose.disconnect();

  return res.status(SUCESS_CODES.OK).json({
    message:
      'Your love chats have found their way to the sunset. 🌅💬 Deleted with grace.',
    success: true,
  });
});

export default deleteChats;
