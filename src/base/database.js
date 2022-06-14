const env = require('./env');
const mongoose = require('mongoose');

const mongooseOptions = {
  user: env.MONGO_USER,
  pass: env.MONGO_PASSWORD,
  dbName: env.MONGO_DATABASE,
};

mongoose
  .connect(env.MONGO_DB_URI, mongooseOptions)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error(err);
  });

process.on('uncaughtException', (err) => {
  console.error(err);
  mongoose.disconnect();
});
