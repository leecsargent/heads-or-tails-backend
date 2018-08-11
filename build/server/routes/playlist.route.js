'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _playlist = require('../controllers/playlist.controller');

var _playlist2 = _interopRequireDefault(_playlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/playlists - Get list of playlists */
.get(_playlist2.default.list);

// TODO fix ... no idea why validation is throwing an error
//   /** POST /api/playlists - Create new playlist */
//   .post(validate(paramValidation.createPlaylist), playlistController.create);
//
// router.route('/:playlistId')
//   /** GET /api/playlists/:playlistId - Get playlist */
//   .get(playlistController.get)
//
//   /** PUT /api/playlists/:playlistId - Update playlist */
//   .put(validate(paramValidation.updatePlaylist), playlistController.update)
//
//   /** DELETE /api/playlists/:playlistId - Delete playlist */
//   .delete(playlistController.remove);
//
// /** Load playlist when API with playlistId route parameter is hit */
// router.param('playlistId', playlistController.load);

exports.default = router;
//# sourceMappingURL=playlist.route.js.map
