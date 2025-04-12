import { Router } from 'express';
import { workoutExerciseController } from '../controllers/WorkoutExerciseController';

const router = Router();

router.post('/', workoutExerciseController.create);
router.get('/', workoutExerciseController.findAll);
router.get('/:id', workoutExerciseController.findOne);
router.put('/:id', workoutExerciseController.update);
router.delete('/:id', workoutExerciseController.delete);

export default router;
