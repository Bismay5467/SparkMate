/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable newline-per-chained-call */
import mongoose from 'mongoose';
import { body, checkExact, param, validationResult } from 'express-validator';

import { ERROR_CODES } from '../../../common/statusCode.mjs';
import { ErrorHandler } from '../../../utils/errorHandler.mjs';
import { messageSchema } from '../../../model/chats/chat.model.mjs';
import {
  MAX_CHARACTERS_FOR_CHAT,
  MESSAGE_STATUS,
} from '../../../common/constants.mjs';

const isValidKeys = (params) => {
  const expectedKeysOfMessageObj = Object.keys(messageSchema.schema.obj);
  if (!params || !(params instanceof Object)) return false;
  if (Object.keys(params)?.length !== expectedKeysOfMessageObj?.length) {
    return false;
  }
  return expectedKeysOfMessageObj?.every((key) =>
    Object.keys(params).includes(key)
  );
};

const isValidObjectID = (params) => mongoose.Types.ObjectId.isValid(params);

const isValidMessage = (params) =>
  typeof params === 'string' &&
  params?.trim().length > 0 &&
  params?.trim().length <= MAX_CHARACTERS_FOR_CHAT;

const isValidMessageStatus = (params) =>
  typeof params === 'string' &&
  (params === MESSAGE_STATUS.SENT || params === MESSAGE_STATUS.FAILED);

const isMessageObjectValid = (params) => {
  if (isValidKeys(params) === false) return false;

  const { userID, inboxID, message, status } = params;

  return (
    isValidObjectID(userID) &&
    isValidObjectID(inboxID) &&
    isValidMessage(message) &&
    isValidMessageStatus(status)
  );
};

const chatsValidation = Object.freeze({
  deleteChat: [
    param('inboxID').trim().notEmpty().isMongoId().escape(),
    checkExact([], { message: 'Too many field specified.' }),
    (req, _res, next) => {
      const result = validationResult(req);
      if (Array.isArray(result) && !result.isEmpty()) {
        return next(
          new ErrorHandler('Validator error.', ERROR_CODES['NOT ACCEPTABLE'])
        );
      }
      return next();
    },
  ],
  getChats: [
    param('inboxID').trim().notEmpty().isMongoId.escape(),
    checkExact([], { message: 'Too many field specified.' }),
    (req, _res, next) => {
      const result = validationResult(req);
      if (Array.isArray(result) && !result.isEmpty()) {
        return next(
          new ErrorHandler('Validator error.', ERROR_CODES['NOT ACCEPTABLE'])
        );
      }
      return next();
    },
  ],
  getAllChats: [
    param('inboxID').trim().notEmpty().isMongoId.escape(),
    body('lastVisit').trim().notEmpty().optional().isString().escape(),
    checkExact([], { message: 'Too many field specified.' }),
    (req, _res, next) => {
      const result = validationResult(req);
      if (Array.isArray(result) && !result.isEmpty()) {
        return next(
          new ErrorHandler('Validator error.', ERROR_CODES['NOT ACCEPTABLE'])
        );
      }
      return next();
    },
  ],
  chatBackup: [
    body('messageArray')
      .trim()
      .isArray()
      .escape()
      .custom((messages) => {
        if (Array.isArray(messages) && messages.length === 0) {
          throw new Error('No messages found.');
        }
        const allMessagesValid = messages.filter((messageObj) =>
          isMessageObjectValid(messageObj)
        );
        if (allMessagesValid === false) {
          throw new Error('Some of them are not valid message objects.');
        }
      }),
    checkExact([], { message: 'Too many field specified.' }),
    (req, _res, next) => {
      const result = validationResult(req);
      if (Array.isArray(result) && !result.isEmpty()) {
        return next(
          new ErrorHandler('Validator error.', ERROR_CODES['NOT ACCEPTABLE'])
        );
      }
      return next();
    },
  ],
  chatSetUp: [
    body('userID')
      .trim()
      .isArray()
      .escape()
      .custom((userIDs) => {
        if (
          Array.isArray(userIDs) &&
          (userIDs.length < 0 || userIDs.length > 2)
        ) {
          throw new Error('Invalid number of userIDs found.');
        }
        const isUserIdsValid =
          userIDs?.every((userID) => isValidObjectID(userID)) || false;
        if (isUserIdsValid === false) {
          throw new Error('Some of the userIDs are not valid.');
        }
      }),
    checkExact([], { message: 'Too many field specified.' }),
    (req, _res, next) => {
      const result = validationResult(req);
      if (Array.isArray(result) && !result.isEmpty()) {
        return next(
          new ErrorHandler('Validator error.', ERROR_CODES['NOT ACCEPTABLE'])
        );
      }
      return next();
    },
  ],
});

export default chatsValidation;
