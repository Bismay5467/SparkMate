import mongoose from 'mongoose';

import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import { MessageCollection } from '../../model/index.mjs';
import connectDB from '../../config/database.config.mjs';

const GetChats = async (inboxID) => {
  try {
    await connectDB();

    const query = { inboxID };

    const projection = {
      userID: 1,
      message: 1,
      status: 1,
      createdAt: 1,
    };

    const sortCriteria = { createdAt: -1 };

    const populationOption = { path: 'userID', select: { name: 1 } };

    const response = await MessageCollection.find(query)
      .populate(populationOption)
      .select(projection)
      .sort(sortCriteria)
      .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
      .lean()
      .exec();

    await mongoose.disconnect();

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetChats;
