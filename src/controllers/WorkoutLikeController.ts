import { Request, Response } from 'express';
import { WorkoutLikeService } from '../services/WorkoutLikeService';
import { WorkoutLikeBusiness } from '../business/WorkoutLikeBusiness';

class WorkoutLikeController {
  /**
   * Controlador para criar um like para uma ficha de treino.
   * @param req Dados do like.
   * @param res Resposta com o like criado.
   * @returns Retorna o like criado.
   */
  async create(req: Request, res: Response) {
    try {
      const workoutLike = await WorkoutLikeBusiness.createWorkoutLike(req.body);
      res.status(201).json(workoutLike);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para buscar o ranking de um treino específico.
   * @param req Requisição com o ID do treino.
   * @param res Resposta com o ranking (likes_count) do treino.
   * @returns Retorna o ranking do treino.
   */
  async getRanking(req: Request, res: Response) {
    const { workoutId } = req.params;

    try {
      const workoutRanking = await WorkoutLikeBusiness.getWorkoutRanking(Number(workoutId));
      res.status(200).json(workoutRanking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  /**
   * Controlador para deletar um like.
   * @param req Dados do ID do like.
   * @param res Resposta com o status da operação.
   * @returns Retorna uma mensagem de sucesso ou erro.
   */
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await WorkoutLikeBusiness.deleteWorkoutLike(Number(id));
      if (success) {
        res.status(200).json({ message: 'Like deletado com sucesso' });
      } else {
        res.status(404).json({ error: 'Like não encontrado' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const workoutLikeController = new WorkoutLikeController();
