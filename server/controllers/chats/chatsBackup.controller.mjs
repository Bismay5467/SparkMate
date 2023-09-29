import { ErrorHandler } from '../../utils/errorHandler.mjs';
import { InsertChats } from '../../services/index.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

const chatsBackup = asyncHandler(async (req, res, next) => {
  const { messageArray: messages } = req.body;

  const response = await InsertChats(messages);

  if (Array.isArray(response) && response.length !== messages.length) {
    return next(
      new ErrorHandler(
        "The melody of your chats was lost in the night's whispers! 🌙💔 Backup of chats failed!!",
        ERROR_CODES['PAYLOAD TOO LARGE']
      )
    );
  }

  return res.status(SUCESS_CODES.OK).json({
    message:
      'Your love story, preserved in the digital whispers of your chats, remains intact! 💕📜',
    success: true,
  });
});

export default chatsBackup;

/*
MESSAGE ARRAY STRUCTURE :

[
  {
    userID // sender of the message
    inboxID
    message
    status
  }
]

*/
