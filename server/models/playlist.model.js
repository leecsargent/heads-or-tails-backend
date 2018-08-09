import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Playlist Schema
 */
const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
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
PlaylistSchema.method({
});

/**
 * Statics
 */
PlaylistSchema.statics = {
  /**
   * Get playlist
   * @param {ObjectId} id - The objectId of playlist.
   * @returns {Promise<Playlist, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((playlist) => {
        if (playlist) {
          return playlist;
        }
        const err = new APIError('No such playlist exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List playlists in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Playlist[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Playlist
 */
export default mongoose.model('Playlist', PlaylistSchema);
