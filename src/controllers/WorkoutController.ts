// controllers/workout.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import { WorkoutBusiness } from '../business/WorkoutBusiness';

const router = Router();
const biz = new WorkoutBusiness();

// CRUD Workout
router.get('/', async (_req, res, next) => {
  try { res.json(await biz.listAll()); }
  catch (err) { next(err); }
});
router.get('/:id', async (req, res, next) => {
  try { res.json(await biz.getById(+req.params.id)); }
  catch (err) { next(err); }
});
router.post('/', async (req, res, next) => {
  try {
    const created = await biz.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});
router.put('/:id', async (req, res, next) => {
  try { res.json(await biz.update(+req.params.id, req.body)); }
  catch (err) { next(err); }
});
router.delete('/:id', async (req, res, next) => {
  try { res.json(await biz.remove(+req.params.id)); }
  catch (err) { next(err); }
});

// Rotas p/ gerenciar exercícios no workout
router.post('/:id/exercises', async (req, res, next) => {
  try {
    const we = await biz.addExercise(+req.params.id, req.body);
    res.status(201).json(we);
  } catch (err) { next(err); }
});
router.put('/exercises/:weId', async (req, res, next) => {
  try { res.json(await biz.updateExercise(+req.params.weId, req.body)); }
  catch (err) { next(err); }
});
router.delete('/exercises/:weId', async (req, res, next) => {
  try { res.json(await biz.removeExercise(+req.params.weId)); }
  catch (err) { next(err); }
});

export default router;
