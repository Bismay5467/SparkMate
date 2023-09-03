import { MESSAGE_STATUS } from '../../common/constants.mjs';

const chats = {
  sender: 1,
  receiver: 2,
  chats: [
    {
      message: 'This is a dummy message received from the sender end.',
      received: true,
      status: MESSAGE_STATUS.SENT,
      timestamp: Date.now(),
    },
    {
      message:
        'This is a dummy message sent from the receiver end as a response to the sender message.',
      received: false,
      status: MESSAGE_STATUS.SENT,
      timestamp: Date.now(),
    },
  ],
};

export default chats;
