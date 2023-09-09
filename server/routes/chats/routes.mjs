import express from 'express';

import {
  chatSetUp,
  deleteChats,
  fetchAllChats,
  fetchChats,
} from '../../controllers/index.mjs';

const router = express.Router();

router.get('/:userID', fetchAllChats);

router.get('/messages/:inboxID', fetchChats);

// router.get('/inboxID', getInboxID);

router.post('/initiate', chatSetUp);

router.post('/messages', (_req, res) => {
  //   const { userID, inboxID, message, status } = req.body.chats;
  res.send('Writing chat message to the database.');
});

router.delete('/messages/:inboxID', deleteChats);

export default router;
