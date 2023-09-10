import mongoose from 'mongoose';

import { InboxCollection } from '../../model/index.mjs';
import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import { SUCESS_CODES } from '../../common/statusCode.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import connectDB from '../../config/database.mjs';

const chatSetUp = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  // const userID = ['64fb8867d6497a8738475cab', '64fb8867d6497a8738475caa'];

  const query = {
    userID: {
      $all: [
        { $elemMatch: { $eq: new mongoose.Types.ObjectId(userID[0]) } },
        { $elemMatch: { $eq: new mongoose.Types.ObjectId(userID[1]) } },
      ],
    },
  };
  const update = { userID };
  const option = { upsert: true, new: true };

  const projection = { _id: 1 };

  await connectDB();

  const response = await InboxCollection.findOneAndUpdate(query, update, option)
    .select(projection)
    .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
    .lean()
    .exec();

  const { _id: inboxID } = response;

  await mongoose.disconnect();

  return res.status(SUCESS_CODES.CREATED).json({
    message:
      "Cupid's arrow has struck! 💘✨ Prepare to embark on a romantic chat and let the sparks fly.",
    success: true,
    inboxID,
  });
});

export default chatSetUp;
