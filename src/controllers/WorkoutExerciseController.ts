import { Request, Response } from 'express';
import { WorkoutExerciseService } from '../services/WorkoutExerciseService';

class WorkoutExerciseController {
  /**
   * Controlador para criar um exercício de treino.
   * @param req Dados do exercício a ser criado.
   * @param res Resposta com o exercício criado.
   * @returns Retorna o exercício criado.
   */
  async create(req: Request, res: Response) {
    try {
      const workoutExercise = await WorkoutExerciseService.createWorkoutExercise(req.body);
      res.status(201).json(workoutExercise);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para listar todos os exercícios.
   * @param req Requisição
   * @param res Resposta com a lista de exercícios.
   * @returns Retorna todos os exercícios.
   */
  async findAll(req: Request, res: Response) {
    try {
      const workoutExercises = await WorkoutExerciseService.findAllWorkoutExercises();
      res.status(200).json(workoutExercises);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para buscar um exercício pelo ID.
   * @param req Dados do ID do exercício.
   * @param res Resposta com o exercício encontrado.
   * @returns Retorna o exercício encontrado.
   */
  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const workoutExercise = await WorkoutExerciseService.findWorkoutExerciseById(Number(id));
      if (workoutExercise) {
        res.status(200).json(workoutExercise);
      } else {
        res.status(404).json({ error: 'Exercício não encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para atualizar um exercício.
   * @param req Dados do ID e dados a serem atualizados.
   * @param res Resposta com o exercício atualizado.
   * @returns Retorna o exercício atualizado.
   */
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedWorkoutExercise = await WorkoutExerciseService.updateWorkoutExercise(Number(id), req.body);
      if (updatedWorkoutExercise) {
        res.status(200).json(updatedWorkoutExercise);
      } else {
        res.status(404).json({ error: 'Exercício não encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para deletar um exercício.
   * @param req Dados do ID do exercício.
   * @param res Resposta com o status da operação.
   * @returns Retorna uma mensagem de sucesso ou erro.
   */
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await WorkoutExerciseService.deleteWorkoutExercise(Number(id));
      if (success) {
        res.status(200).json({ message: 'Exercício deletado com sucesso' });
      } else {
        res.status(404).json({ error: 'Exercício não encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const workoutExerciseController = new WorkoutExerciseController();
