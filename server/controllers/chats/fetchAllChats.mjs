import mongoose from 'mongoose';

import { InboxCollection } from '../../model/index.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import connectDB from '../../config/database.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

const fetchAllChats = asyncHandler(async (req, res) => {
  const userID = new mongoose.Types.ObjectId(req.params.userID);
  const lastVisit = new Date(req.body.lastVisit ?? null);

  // userID : 64fb8867d6497a8738475caa

  await connectDB();

  const chats = await InboxCollection.aggregate([
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
                  { $gte: ['$createdAt', '$$lastVisit'] },
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

  if (Array.isArray(chats) && chats.length === 0) {
    return res.status(ERROR_CODES['NOT FOUND']).json({
      message:
        'When you match with other users they will appear here where you can send them a message',
      success: false,
    });
  }

  await mongoose.disconnect();

  return res
    .status(SUCESS_CODES.OK)
    .json({ message: 'All chats successfully fetched.', chats, success: true });
});

export default fetchAllChats;

/*

------------------------API RESPONSE------------------------

{
    "message": "All chats successfully fetched.",
    "chats": [
        {
            "_id": "64fc0de51e0ff36bb46c7988",
            "newMessages": {
                "messageCount": 2
            },
            "userDetails": {
                "_id": "64fb8867d6497a8738475cab",
                "name": "Biplaw Singh",
                "photos": [
                    "biplaw singh's nudes",
                    "biplaw singh in yoga pants"
                ]
            }
        },
        {
            "_id": "64fc0e7821263725c66c1292",
            "newMessages": {
                "messageCount": 2
            },
            "userDetails": {
                "_id": "64fb8867d6497a8738475cac",
                "name": "Arkojeet Bera",
                "photos": [
                    "arkojeet bera's nudes",
                    "arkojeet bera in hot pants"
                ]
            }
        }
    ],
    "success": true
}

-----------------------------------------------------------------

*/
