import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import randomController from '../controllers/random.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(randomController.headsOrTails)

export default router;
