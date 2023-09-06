import express from 'express';

const router = express.Router();

router.get('/:userID', (_req, res) => {
  res.send('Route to support fetching of all the chats with different users');
});

router.get('/:inboxID', (req, res) => {
  const { inboxID } = req.params;
  res.send(`Route to support fetching of all the chats of ${inboxID}`);
});

router.post('/messages', (_req, res) => {
  //   const { userID, inboxID, message, status } = req.body.chats;
  res.send('Writing chat message to the database.');
});

router.delete('/messages/inboxID', (req, res) => {
  const { inboxID } = req.params;
  res.send(`Deleting all existing chats on unmatching of inbox ID: ${inboxID}`);
});
export default router;
