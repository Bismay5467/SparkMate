import express from 'express';

import {
  chatSetUp,
  chatsBackup,
  deleteChats,
  fetchAllChats,
  fetchChats,
} from '../../controllers/index.mjs';

import { chatsValidation } from '../../middlewares/index.mjs';

const router = express.Router();

router.get('/:userID', chatsValidation.getAllChats, fetchAllChats);

router.get('/messages/:inboxID', chatsValidation.getChats, fetchChats);

router.post('/initiate', chatsValidation.chatSetUp, chatSetUp);

router.post('/messages', chatsValidation.chatBackup, chatsBackup);

router.delete('/messages/:inboxID', chatsValidation.deleteChat, deleteChats);

export default router;
