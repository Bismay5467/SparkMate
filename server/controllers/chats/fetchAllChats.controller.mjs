import mongoose from 'mongoose';

import { GetAllChats } from '../../services/index.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';
import { ERROR_CODES, SUCESS_CODES } from '../../common/statusCode.mjs';

const fetchAllChats = asyncHandler(async (req, res) => {
  const userID = new mongoose.Types.ObjectId(req.params.userID);
  const lastVisit = new Date(req.body.lastVisit ?? null);

  // userID : 64fb8867d6497a8738475caa

  const chats = await GetAllChats({ userID, lastVisit });

  if (Array.isArray(chats) && chats.length === 0) {
    return res.status(ERROR_CODES['NOT FOUND']).json({
      message:
        "When the stars align and you match with someone special, this is where magic happens, where your words can create a love story that's written in the stars. ✨💖📜",
      success: false,
    });
  }

  return res.status(SUCESS_CODES.OK).json({
    message: 'Your love stories, all gathered here, ready to bloom. 🌹💬',
    chats,
    success: true,
  });
});

export default fetchAllChats;

/*

------------------------API RESPONSE------------------------

{
    "message": "Your love stories, all gathered here, ready to bloom. 🌹💬",
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
