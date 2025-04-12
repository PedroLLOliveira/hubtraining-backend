import { Router } from 'express';
import { workoutController } from '../controllers/WorkoutController';

const router = Router();

router.post('/', workoutController.create);
router.get('/', workoutController.findAll);
router.get('/:id', workoutController.findOne);
router.put('/:id', workoutController.update);
router.delete('/:id', workoutController.delete);

export default router;
