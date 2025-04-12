import { Router } from 'express';
import { workoutLikeController } from '../controllers/WorkoutLikeController';

const router = Router();

router.post('/', workoutLikeController.create);
router.delete('/:id', workoutLikeController.delete);
router.get('/ranking/:workoutId', workoutLikeController.getRanking);

export default router;
