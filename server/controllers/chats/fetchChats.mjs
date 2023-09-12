import { GetChats } from '../../services/index.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

const fetchChats = asyncHandler(async (req, res) => {
  const { inboxID } = req.params;

  // inboxID : 64fc0de51e0ff36bb46c7988

  const messages = await GetChats(inboxID);

  if (Array.isArray(messages) && messages.length === 0) {
    return res.status(ERROR_CODES['NOT FOUND']).json({
      message: 'Find your spark and start a romantic conversation. 💕',
      success: false,
    });
  }

  return res.status(SUCESS_CODES.OK).json({
    message:
      'Every chat, a chapter in your love story, now at your fingertips. 😻❤️',
    success: true,
    messages,
  });
});

export default fetchChats;
/*

----------------------------------API RESPONSE----------------------------------------------------

{
    "message": "Every chat, a chapter in your love story, now at your fingertips. 😻❤️",
    "success": true,
    "messages": [
        {
            "_id": "64fc4a53b6d2cca61bfac6dd",
            "userID": {
                "_id": "64fb8867d6497a8738475caa",
                "name": "Rahul Maity"
            },
            "message": "first dummy message b/w rahul and biplaw sent by rahul",
            "status": "sent",
            "createdAt": "2023-09-09T06:50:56.957Z"
        },
        {
            "_id": "64fc14e0c0d5a6a69ba95744",
            "userID": {
                "_id": "64fb8867d6497a8738475caa",
                "name": "Rahul Maity"
            },
            "message": "first dummy message b/w rahul and biplaw sent by rahul",
            "status": "sent",
            "createdAt": "2023-09-09T06:46:56.957Z"
        }
    ]
}

----------------------------------------------------------------------------------------------------

*/
