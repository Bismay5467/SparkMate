import mongoose from 'mongoose';

import { MESSAGE_STATUS } from '../common/constants.mjs';

const chatSchema = new mongoose.Schema(
  {
    chats: [
      {
        message: {
          // eslint-disable-next-line no-magic-numbers
          maxlength: [1000, 'Message can be atmost of 1000 characters.'],
          required: [true, 'Message is a required field.'],
          type: String,
        },
        received: {
          required: [true, 'Received is a required field.'],
          type: Boolean,
        },
        status: {
          enum: [MESSAGE_STATUS.FAILED, MESSAGE_STATUS.SENT],
          required: [true, 'Message status is a required field.'],
          type: String,
        },
        timestamp: {
          default: Date.now,
          type: Date,
        },
      },
    ],
    receiver: {
      ref: 'users',
      required: [true, 'Receiver ID is a required field.'],
      type: mongoose.Types.ObjectId,
    },
    sender: {
      ref: 'users',
      required: [true, 'Sender ID is a required field.'],
      type: mongoose.Types.ObjectId,
    },
  },
  { strict: true }
);

const chats = mongoose.model('chats', chatSchema);

export default chats;
