'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playlist = require('../models/playlist.model');

var _playlist2 = _interopRequireDefault(_playlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load playlist and append to req.
 */
function load(req, res, next, id) {
  _playlist2.default.get(id).then(function (playlist) {
    req.playlist = playlist; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get playlist
 * @returns {Playlist}
 */
function get(req, res) {
  return res.json(req.playlist);
}

/**
 * Create new playlist
 * @property {string} req.body.name - The name of playlist.
 * @property {string} req.body.slug - The slug of playlist.
 * @returns {Playlist}
 */
function create(req, res, next) {
  var playlist = new _playlist2.default({
    name: req.body.name,
    slug: req.body.slug
  });

  playlist.save().then(function (savedPlaylist) {
    return res.json(savedPlaylist);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing playlist
 * @property {string} req.body.name - The name of playlist.
 * @property {string} req.body.slug - The slug of playlist.
 * @returns {Playlist}
 */
function update(req, res, next) {
  var playlist = req.playlist;
  playlist.name = req.body.name;
  playlist.slug = req.body.slug;

  playlist.save().then(function (savedPlaylist) {
    return res.json(savedPlaylist);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get playlist list.
 * @property {number} req.query.skip - Number of playlists to be skipped.
 * @property {number} req.query.limit - Limit number of playlists to be returned.
 * @returns {Playlist[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _playlist2.default.list({ limit: limit, skip: skip }).then(function (playlists) {
    return res.json(playlists);
  }).catch(function (e) {
    return next(e);
  });
}

// TODO
// /**
//  * Delete user.
//  * @returns {User}
//  */
// function remove(req, res, next) {
//   const user = req.user;
//   user.remove()
//     .then(deletedUser => res.json(deletedUser))
//     .catch(e => next(e));
// }

exports.default = {
  load: load,
  get: get,
  create: create,
  update: update,
  list: list
};
//# sourceMappingURL=playlist.controller.js.map
