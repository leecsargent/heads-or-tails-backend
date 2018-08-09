import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import playlistController from '../controllers/playlist.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/playlists - Get list of playlists */
  .get(playlistController.list)

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

export default router;
