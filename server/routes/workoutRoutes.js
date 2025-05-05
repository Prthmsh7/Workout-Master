import express from 'express';
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  completeWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All workout routes require authentication
router.use(protect);

router.route('/')
  .post(createWorkout)
  .get(getWorkouts);

router.route('/:id')
  .get(getWorkout)
  .delete(deleteWorkout);

router.route('/:id/complete')
  .put(completeWorkout);

export default router; 