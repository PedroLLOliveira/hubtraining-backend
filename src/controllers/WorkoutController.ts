import { Request, Response } from 'express';
import { WorkoutService } from '../services/WorkoutService';

class WorkoutController {
  /**
   * Controlador para criar uma ficha de treino.
   * @param req Dados da ficha de treino a ser criada.
   * @param res Resposta com a ficha de treino criada.
   * @returns Retorna a ficha de treino criada.
   */
  async create(req: Request, res: Response) {
    try {
      const workout = await WorkoutService.createWorkout(req.body);
      res.status(201).json(workout);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para listar todas as fichas de treino.
   * @param req Requisição
   * @param res Resposta com a lista de fichas.
   * @returns Retorna todas as fichas de treino.
   */
  async findAll(req: Request, res: Response) {
    try {
      const workouts = await WorkoutService.findAllWorkouts();
      res.status(200).json(workouts);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para encontrar uma ficha de treino pelo ID.
   * @param req Dados do ID da ficha de treino.
   * @param res Resposta com a ficha de treino encontrada.
   * @returns Retorna a ficha de treino encontrada.
   */
  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const workout = await WorkoutService.findWorkoutById(Number(id));
      if (workout) {
        res.status(200).json(workout);
      } else {
        res.status(404).json({ error: 'Ficha de treino não encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para atualizar uma ficha de treino.
   * @param req Dados do ID e dados a serem atualizados.
   * @param res Resposta com a ficha de treino atualizada.
   * @returns Retorna a ficha de treino atualizada.
   */
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedWorkout = await WorkoutService.updateWorkout(Number(id), req.body);
      if (updatedWorkout) {
        res.status(200).json(updatedWorkout);
      } else {
        res.status(404).json({ error: 'Ficha de treino não encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para deletar uma ficha de treino.
   * @param req Dados do ID da ficha de treino.
   * @param res Resposta com o status da operação.
   * @returns Retorna uma mensagem de sucesso ou erro.
   */
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await WorkoutService.deleteWorkout(Number(id));
      if (success) {
        res.status(200).json({ message: 'Ficha de treino deletada com sucesso' });
      } else {
        res.status(404).json({ error: 'Ficha de treino não encontrada' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const workoutController = new WorkoutController();
