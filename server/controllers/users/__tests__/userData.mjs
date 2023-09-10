import mongoose from 'mongoose';

import { SUCESS_CODES } from '../../../common/statusCode.mjs';
import { user as UserCollection } from '../../../model/users/user.model.mjs';
import asyncHandler from '../../../utils/asyncHandler.mjs';
import connectDB from '../../../config/database.mjs';
import { user1, user2, user3 } from '../../../mocks/users/user.mocks.mjs';

const insertUserData = asyncHandler(async (req, res) => {
  await connectDB();

  const response = await UserCollection.insertMany([user1, user2, user3]);
  // eslint-disable-next-line no-console
  console.log(response);
  await mongoose.disconnect();

  res
    .status(SUCESS_CODES.OK)
    .json({ message: 'data inserted successfully.', success: true });
});

export default insertUserData;
