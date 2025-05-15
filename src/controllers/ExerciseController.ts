// controllers/exercise.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import { ExerciseBusiness } from '../business/ExerciseBusiness';

const router = Router();
const biz = new ExerciseBusiness();

// Listar todos
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await biz.listAll();
    res.json(list);
  } catch (err) { next(err); }
});

// Obter por ID
router.get('/:id', async (req, res, next) => {
  try {
    const ex = await biz.getById(req.params.id);
    res.json(ex);
  } catch (err) { next(err); }
});

// Criar
router.post('/', async (req, res, next) => {
  try {
    const created = await biz.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// Atualizar
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await biz.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
});

// Deletar
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await biz.remove(req.params.id);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
