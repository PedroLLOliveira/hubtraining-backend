import { Router } from 'express';
import { planController } from '../controllers/PlanController';

const router = Router();

router.post('/', planController.create);
router.get('/', planController.list);
router.put('/:id', planController.update);
router.delete('/:id', planController.delete);

export default router;
