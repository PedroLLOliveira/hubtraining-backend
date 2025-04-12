import { WorkoutLike } from '../models/WorkoutLike';
import { WorkoutRanking } from '../models/WorkoutRanking';

export class WorkoutLikeService {
  /**
   * Cria um like para uma ficha de treino.
   * @param workoutLikeData Dados do like.
   * @returns Retorna o like criado.
   */
  static async create(workoutLikeData: any) {
    return await WorkoutLike.create(workoutLikeData);
  }

  /**
   * Conta os likes para um determinado workout_id.
   * @param workoutId ID do workout.
   * @returns Retorna a quantidade de likes.
   */
  static async countLikes(workoutId: number) {
    return await WorkoutLike.count({ where: { workout_id: workoutId } });
  }

  /**
   * Encontra um like específico pelo ID.
   * @param id ID do like.
   * @returns Retorna o like encontrado.
   */
  static async findById(id: number) {
    return await WorkoutLike.findByPk(id);
  }

  /**
   * Deleta um like específico.
   * @param id ID do like.
   * @returns Retorna um booleano indicando sucesso.
   */
  static async delete(id: number) {
    const workoutLike = await WorkoutLike.findByPk(id);
    if (workoutLike) {
      await workoutLike.destroy();
      return true;
    }
    return false;
  }

  /**
   * Encontra um ranking de treino baseado no workout_id.
   * @param workoutId ID do workout.
   * @returns Retorna o ranking do workout, se existir.
   */
  static async findRankingByWorkoutId(workoutId: number) {
    return await WorkoutRanking.findOne({ where: { workout_id: workoutId } });
  }

  /**
   * Cria ou atualiza o ranking do treino com base no workout_id e likes_count.
   * @param workoutId ID do workout.
   * @param likesCount Número de likes.
   * @returns Retorna o ranking criado ou atualizado.
   */
  static async createOrUpdateRanking(workoutId: number, likesCount: number) {
    const workoutRanking = await WorkoutLikeService.findRankingByWorkoutId(workoutId);
    if (workoutRanking) {
      return await workoutRanking.update({ likes_count: likesCount });
    } else {
      return await WorkoutRanking.create({ workout_id: workoutId, likes_count: likesCount } as WorkoutRanking);
    }
  }
}
