export const DEFAULT_DB_CONFIG = Object.freeze({
  MONGO_MAX_POOLSIZE: 100,
  MONGO_TIMEOUT_MS: 5000,
  MONGO_USER: 'Bismay',
  MONGO_PASSWORD: 'Bismay5467',
  MONGO_DB: 'dating_app',
});

export const MONGO_URI = `mongodb+srv://${DEFAULT_DB_CONFIG.MONGO_USER}:${DEFAULT_DB_CONFIG.MONGO_PASSWORD}@cluster0.usbeazf.mongodb.net/${DEFAULT_DB_CONFIG.MONGO_DB}?retryWrites=true&w=majority`;
