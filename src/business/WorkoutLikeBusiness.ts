import { WorkoutLikeService } from '../services/WorkoutLikeService';

export class WorkoutLikeBusiness {
  /**
   * Lógica de criação de um like e atualização do ranking.
   * @param workoutLikeData Dados do like.
   * @returns Retorna o like criado.
   */
  static async createWorkoutLike(workoutLikeData: any) {
    // Cria o like
    const workoutLike = await WorkoutLikeService.create(workoutLikeData);

    // Conta os likes para o workout_id
    const likesCount = await WorkoutLikeService.countLikes(workoutLike.workout_id);

    // Cria ou atualiza o ranking
    await WorkoutLikeService.createOrUpdateRanking(workoutLike.workout_id, likesCount);

    return workoutLike;
  }

  /**
   * Retorna o ranking (likes_count) de um treino específico.
   * @param workoutId ID do workout.
   * @returns Retorna o ranking do treino ou uma mensagem de erro.
   */
  static async getWorkoutRanking(workoutId: number) {
    // Encontra o ranking
    const workoutRanking = await WorkoutLikeService.findRankingByWorkoutId(workoutId);

    if (!workoutRanking) {
      throw new Error('Ranking não encontrado para este treino.');
    }

    return workoutRanking;
  }

  /**
   * Lógica para deletar um like e atualizar o ranking.
   * @param id ID do like.
   * @returns Retorna o status da operação.
   */
  static async deleteWorkoutLike(id: number) {
    const success = await WorkoutLikeService.delete(id);

    if (success) {
      // Após a exclusão, atualiza o ranking
      const workoutLike = await WorkoutLikeService.findById(id);
      if (workoutLike) {
        const likesCount = await WorkoutLikeService.countLikes(workoutLike.workout_id);
        await WorkoutLikeService.createOrUpdateRanking(workoutLike.workout_id, likesCount);
      }
    }

    return success;
  }
}
