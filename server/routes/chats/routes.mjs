import express from 'express';

import {
  chatSetUp,
  chatsBackup,
  deleteChats,
  fetchAllChats,
  fetchChats,
} from '../../controllers/index.mjs';

const router = express.Router();

router.get('/:userID', fetchAllChats);

router.get('/messages/:inboxID', fetchChats);

router.post('/initiate', chatSetUp);

router.post('/messages', chatsBackup);

router.delete('/messages/:inboxID', deleteChats);

export default router;
