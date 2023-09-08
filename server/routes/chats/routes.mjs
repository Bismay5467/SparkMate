import express from 'express';

import { deleteChats, fetchAllChats } from '../../controllers/index.mjs';

const router = express.Router();

router.get('/:userID', fetchAllChats);

router.get('/:inboxID', (req, res) => {
  const { inboxID } = req.params;
  res.send(`Route to support fetching of all the chats of ${inboxID}`);
});

router.post('/messages', (_req, res) => {
  //   const { userID, inboxID, message, status } = req.body.chats;
  res.send('Writing chat message to the database.');
});

router.delete('/messages/inboxID', deleteChats);

export default router;
