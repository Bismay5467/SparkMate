import mongoose from 'mongoose';

import { userSchema } from '../users/user.model.mjs';
import {
  MAX_CHARACTERS_FOR_CHAT,
  MESSAGE_STATUS,
} from '../../common/constants.mjs';

mongoose.model('user', userSchema);

export const messageSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'UserID is a required field.'],
    },
    inboxID: {
      type: mongoose.Types.ObjectId,
      ref: 'inbox',
      required: [true, 'InboxID is a required field.'],
    },
    message: {
      type: String,
      required: [true, 'Message is a required field.'],
      trim: true,
      maxLength: MAX_CHARACTERS_FOR_CHAT,
    },
    status: {
      type: String,
      required: [true, 'Status is a required field.'],
      enum: Object.values(MESSAGE_STATUS),
    },
  },
  { timestamps: true },
  { strict: true }
);

export const message = mongoose.model('message', messageSchema);

const inboxSchema = new mongoose.Schema(
  {
    userID: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'user',
        },
      ],
      validate: {
        validator(userIDs) {
          return (
            // eslint-disable-next-line no-magic-numbers
            new Set(userIDs).size === userIDs.length && userIDs.length === 2
          );
        },
        message: 'Group chats or self chats are not supported as of now.',
      },
      required: [true, 'UserID is a required field.'],
    },
  },
  { strict: true }
);

inboxSchema.pre(
  'deleteOne',
  { document: false, query: true },
  // eslint-disable-next-line func-names
  async function (next) {
    try {
      const {
        _conditions: { _id: inboxID },
      } = this;
      const filter = { inboxID };
      await message.deleteMany(filter);
      next();
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

export const inbox = mongoose.model('inbox', inboxSchema);
