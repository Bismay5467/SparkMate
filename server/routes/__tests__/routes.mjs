import express from 'express';

import {
  SeedInboxData,
  SeedMessageData,
  SeedUserData,
} from '../../controllers/index.mjs';

const router = express.Router();

/*
------------------------CHATS-------------------
*/

router.post('/inbox', SeedInboxData);
router.post('/message', SeedMessageData);

/*
------------------------------------------------
*/

/*
----------------------USERS---------------------
*/

router.post('/user', SeedUserData);

/*
------------------------------------------------
*/

export default router;
