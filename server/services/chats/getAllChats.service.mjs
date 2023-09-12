import mongoose from 'mongoose';

import { InboxCollection } from '../../model/index.mjs';
import connectDB from '../../config/database.config.mjs';

const GetAllChats = async ({ userID, lastVisit }) => {
  try {
    await connectDB();

    const response = await InboxCollection.aggregate([
      {
        $match: {
          userID: {
            $in: [userID],
          },
        },
      },
      {
        $lookup: {
          from: 'messages',
          let: { inboxId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$inboxID', '$$inboxId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            { $project: { message: 1, createdAt: 1 } },
          ],
          as: 'latestMessage',
        },
      },
      {
        $sort: { 'latestMessage.createdAt': -1 },
      },
      {
        $lookup: {
          from: 'messages',
          let: { inboxId: '$_id', lastVisit },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$inboxID', '$$inboxId'] },
                    { $gt: ['$createdAt', '$$lastVisit'] },
                  ],
                },
              },
            },
            { $count: 'messageCount' },
          ],
          as: 'newMessages',
        },
      },
      {
        $unwind: {
          path: '$newMessages',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $match: {
          'userDetails._id': { $ne: userID },
        },
      },
      {
        $project: {
          _id: 1,
          'userDetails._id': 1,
          'userDetails.name': 1,
          'userDetails.photos': 1,
          'newMessages.messageCount': 1,
        },
      },
    ]).exec();

    await mongoose.disconnect();

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default GetAllChats;
