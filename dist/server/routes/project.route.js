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

var _project = require('../controllers/project.controller');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/projects - Get list of projects */
.get(_project2.default.list);

// TODO fix ... no idea why validation is throwing an error
//   /** POST /api/projects - Create new project */
//   .post(validate(paramValidation.createProject), projectController.create);
//
// router.route('/:projectId')
//   /** GET /api/projects/:projectId - Get project */
//   .get(projectController.get)
//
//   /** PUT /api/projects/:projectId - Update project */
//   .put(validate(paramValidation.updateProject), projectController.update)
//
//   /** DELETE /api/projects/:projectId - Delete project */
//   .delete(projectController.remove);
//
// /** Load project when API with projectId route parameter is hit */
// router.param('projectId', projectController.load);

exports.default = router;
//# sourceMappingURL=project.route.js.map
