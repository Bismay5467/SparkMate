import dotenv from 'dotenv';

// eslint-disable-next-line import/no-named-default
import { default as app } from './app.mjs';
import { DEFAULT_DEV_PORT, EXIT_FAILURE } from './common/constants.mjs';

dotenv.config();

const PORT = Number(process.env.DEV_PORT) || DEFAULT_DEV_PORT;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

process.on('unhandledRejection', (error) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(error.name, error.message);
  app.close(() => process.exit(EXIT_FAILURE));
});
