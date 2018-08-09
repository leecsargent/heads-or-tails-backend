import Playlist from '../models/playlist.model';

/**
 * Load playlist and append to req.
 */
function load(req, res, next, id) {
  Playlist.get(id)
    .then((playlist) => {
      req.playlist = playlist; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
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
  const playlist = new Playlist({
    name: req.body.name,
    slug: req.body.slug
  });

  playlist.save()
    .then(savedPlaylist => res.json(savedPlaylist))
    .catch(e => next(e));
}

/**
 * Update existing playlist
 * @property {string} req.body.name - The name of playlist.
 * @property {string} req.body.slug - The slug of playlist.
 * @returns {Playlist}
 */
function update(req, res, next) {
  const playlist = req.playlist;
  playlist.name = req.body.name;
  playlist.slug = req.body.slug;

  playlist.save()
    .then(savedPlaylist => res.json(savedPlaylist))
    .catch(e => next(e));
}

/**
 * Get playlist list.
 * @property {number} req.query.skip - Number of playlists to be skipped.
 * @property {number} req.query.limit - Limit number of playlists to be returned.
 * @returns {Playlist[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Playlist.list({ limit, skip })
    .then(playlists => res.json(playlists))
    .catch(e => next(e));
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

export default {
  load,
  get,
  create,
  update,
  list,
  // remove
 };
