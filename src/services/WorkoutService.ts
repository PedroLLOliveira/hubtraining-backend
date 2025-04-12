import { Workout } from '../models/Workout';

export class WorkoutService {
  /**
   * Cria uma nova ficha de treino.
   * @param workoutData Dados da ficha de treino.
   * @returns Retorna a ficha de treino criada.
   */
  static async createWorkout(workoutData: any) {
    const workout = await Workout.create(workoutData);
    return workout;
  }

  /**
   * Encontra todas as fichas de treino.
   * @returns Retorna uma lista de fichas de treino.
   */
  static async findAllWorkouts() {
    const workouts = await Workout.findAll();
    return workouts;
  }

  /**
   * Encontra uma ficha de treino pelo ID.
   * @param id ID da ficha de treino.
   * @returns Retorna a ficha de treino encontrada.
   */
  static async findWorkoutById(id: number) {
    const workout = await Workout.findByPk(id);
    return workout;
  }

  /**
   * Atualiza uma ficha de treino.
   * @param id ID da ficha de treino.
   * @param workoutData Dados para atualizar a ficha.
   * @returns Retorna a ficha de treino atualizada.
   */
  static async updateWorkout(id: number, workoutData: any) {
    const workout = await Workout.findByPk(id);
    if (workout) {
      await workout.update(workoutData);
      return workout;
    }
    return null;
  }

  /**
   * Deleta uma ficha de treino.
   * @param id ID da ficha de treino.
   * @returns Retorna um booleano indicando sucesso.
   */
  static async deleteWorkout(id: number) {
    const workout = await Workout.findByPk(id);
    if (workout) {
      await workout.destroy();
      return true;
    }
    return false;
  }
}
