import express from 'express';
import randomRoutes from './random.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/random', randomRoutes)

export default router;
