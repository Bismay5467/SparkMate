import mongoose from 'mongoose';

import { InboxCollection } from '../../model/index.mjs';
import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import connectDB from '../../config/database.config.mjs';

const ChatSetUp = async (userID) => {
  try {
    await connectDB();

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

    const response = await InboxCollection.findOneAndUpdate(
      query,
      update,
      option
    )
      .select(projection)
      .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
      .lean()
      .exec();

    await mongoose.disconnect();

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default ChatSetUp;
