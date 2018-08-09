import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import projectController from '../controllers/project.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of projects */
  .get(projectController.list)

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

export default router;
