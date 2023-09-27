import mongoose from 'mongoose';

import { InboxCollection } from '../../model/index.mjs';
import { MAX_QUERY_EXEC_TIME_MS } from '../../common/constants.mjs';
import connectDB from '../../config/database.config.mjs';

const DeleteChats = async (inboxID) => {
  try {
    await connectDB();

    const filter = { _id: inboxID };

    const response = await InboxCollection.deleteOne(filter)
      .maxTimeMS(MAX_QUERY_EXEC_TIME_MS)
      .exec();

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    // eslint-disable-next-line no-console
    await mongoose.disconnect(() => console.log('Database connection closed!'));
  }
};

export default DeleteChats;
