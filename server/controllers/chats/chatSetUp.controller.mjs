import { ChatSetUp } from '../../services/index.mjs';
import { SUCESS_CODES } from '../../common/statusCode.mjs';
import asyncHandler from '../../utils/asyncHandler.mjs';

const chatSetUp = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  // const userID = ['64fb8867d6497a8738475cab', '64fb8867d6497a8738475caa'];

  const response = await ChatSetUp(userID);

  const { _id: inboxID } = response;

  return res.status(SUCESS_CODES.CREATED).json({
    message:
      "Cupid's arrow has struck! 💘✨ Prepare to embark on a romantic chat and let the sparks fly.",
    success: true,
    inboxID,
  });
});

export default chatSetUp;
