'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _project = require('../models/project.model');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load project and append to req.
 */
function load(req, res, next, id) {
  _project2.default.get(id).then(function (project) {
    req.project = project; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get project
 * @returns {Project}
 */
function get(req, res) {
  return res.json(req.project);
}

/**
 * Create new project
 * @property {string} req.body.title - The title of project.
 * @property {string} req.body.slug - The slug of project.
 * @returns {Project}
 */
function create(req, res, next) {
  var project = new _project2.default({
    title: req.body.title,
    slug: req.body.slug
  });

  project.save().then(function (savedProject) {
    return res.json(savedProject);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing project
 * @property {string} req.body.title - The title of project.
 * @property {string} req.body.slug - The slug of project.
 * @returns {Project}
 */
function update(req, res, next) {
  var project = req.project;
  project.title = req.body.title;
  project.slug = req.body.slug;

  project.save().then(function (savedProject) {
    return res.json(savedProject);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get project list.
 * @property {number} req.query.skip - Number of projects to be skipped.
 * @property {number} req.query.limit - Limit number of projects to be returned.
 * @returns {Project[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _project2.default.list({ limit: limit, skip: skip }).then(function (projects) {
    return res.json(projects);
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
//# sourceMappingURL=project.controller.js.map
