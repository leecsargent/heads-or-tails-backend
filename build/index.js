'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config should be imported before importing any other file
var debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
_mongoose2.default.Promise = Promise;

// connect to mongo db
var mongoUri = _config2.default.mongo.host;
var database = _mongoose2.default.connection;

database.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  _mongoose2.default.disconnect();
});

database.on('connected', function () {
  console.log('MongoDB connected!');
});

database.once('open', function () {
  console.log('MongoDB connection opened!');
});

database.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});

database.on('disconnected', function () {
  console.log('MongoDB disconnected!');
  _mongoose2.default.connect(mongoUri, {
    server: {
      auto_reconnect: true
    }
  });
});

// print mongoose logs in dev env
if (_config2.default.MONGOOSE_DEBUG) {
  _mongoose2.default.set('debug', function (collectionName, method, query, doc) {
    debug(collectionName + '.' + method, _util2.default.inspect(query, false, 20), doc);
  });
}

_mongoose2.default.connect(mongoUri, {
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
  _express2.default.listen(_config2.default.port, function () {
    console.info('server started on port ' + _config2.default.port + ' (' + _config2.default.env + ')'); // eslint-disable-line no-console
  });
}

exports.default = _express2.default;
//# sourceMappingURL=index.js.map
