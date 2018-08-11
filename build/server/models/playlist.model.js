'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Playlist Schema
 */
var PlaylistSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PlaylistSchema.method({});

/**
 * Statics
 */
PlaylistSchema.statics = {
  /**
   * Get playlist
   * @param {ObjectId} id - The objectId of playlist.
   * @returns {Promise<Playlist, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (playlist) {
      if (playlist) {
        return playlist;
      }
      var err = new _APIError2.default('No such playlist exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List playlists in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Playlist[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$skip = _ref.skip,
        skip = _ref$skip === undefined ? 0 : _ref$skip,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  }
};

/**
 * @typedef Playlist
 */
exports.default = _mongoose2.default.model('Playlist', PlaylistSchema);
//# sourceMappingURL=playlist.model.js.map
