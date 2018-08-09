import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
const database = mongoose.connection;

database.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});

database.on('connected', function() {
  console.log('MongoDB connected!');
});

database.once('open', function() {
  console.log('MongoDB connection opened!');
});

database.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});

database.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  mongoose.connect(mongoUri, {
    server: {
      auto_reconnect: true,
    }
  });
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

mongoose.connect(mongoUri, {
  server: {
    auto_reconnect: true,
    socketOptions: {
      keepAlive: 1
    }
  }
});

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

export default app;
