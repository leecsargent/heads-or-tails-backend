import Project from '../models/project.model';

/**
 * Load project and append to req.
 */
function load(req, res, next, id) {
  Project.get(id)
    .then((project) => {
      req.project = project; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
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
  const project = new Project({
    title: req.body.title,
    slug: req.body.slug
  });

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Update existing project
 * @property {string} req.body.title - The title of project.
 * @property {string} req.body.slug - The slug of project.
 * @returns {Project}
 */
function update(req, res, next) {
  const project = req.project;
  project.title = req.body.title;
  project.slug = req.body.slug;

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Get project list.
 * @property {number} req.query.skip - Number of projects to be skipped.
 * @property {number} req.query.limit - Limit number of projects to be returned.
 * @returns {Project[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Project.list({ limit, skip })
    .then(projects => res.json(projects))
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
