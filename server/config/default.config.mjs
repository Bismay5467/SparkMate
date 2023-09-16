export const DEFAULT_DB_CONFIG = Object.freeze({
  MONGO_MAX_POOLSIZE: 100,
  MONGO_TIMEOUT_MS: 5000,
  MONGO_USER: 'austin_3_16',
  MONGO_PASSWORD: 'austin696969',
  MONGO_DB: 'SparkMate',
});

export const MONGO_URI = `mongodb+srv://${DEFAULT_DB_CONFIG.MONGO_USER}:${DEFAULT_DB_CONFIG.MONGO_PASSWORD}@cluster0.fs9uxg6.mongodb.net/${DEFAULT_DB_CONFIG.MONGO_DB}?retryWrites=true&w=majority`;
