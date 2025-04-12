import { WorkoutExercise } from '../models/WorkoutExercise';

export class WorkoutExerciseService {
  /**
   * Cria um novo exercício para a ficha de treino.
   * @param workoutExerciseData Dados do exercício a ser criado.
   * @returns Retorna o exercício criado.
   */
  static async createWorkoutExercise(workoutExerciseData: any) {
    const workoutExercise = await WorkoutExercise.create(workoutExerciseData);
    return workoutExercise;
  }

  /**
   * Encontra todos os exercícios de todas as fichas de treino.
   * @returns Retorna uma lista de exercícios.
   */
  static async findAllWorkoutExercises() {
    const workoutExercises = await WorkoutExercise.findAll();
    return workoutExercises;
  }

  /**
   * Encontra um exercício específico pelo ID.
   * @param id ID do exercício.
   * @returns Retorna o exercício encontrado.
   */
  static async findWorkoutExerciseById(id: number) {
    const workoutExercise = await WorkoutExercise.findByPk(id);
    return workoutExercise;
  }

  /**
   * Atualiza um exercício.
   * @param id ID do exercício a ser atualizado.
   * @param workoutExerciseData Dados para atualizar o exercício.
   * @returns Retorna o exercício atualizado.
   */
  static async updateWorkoutExercise(id: number, workoutExerciseData: any) {
    const workoutExercise = await WorkoutExercise.findByPk(id);
    if (workoutExercise) {
      await workoutExercise.update(workoutExerciseData);
      return workoutExercise;
    }
    return null;
  }

  /**
   * Deleta um exercício.
   * @param id ID do exercício.
   * @returns Retorna um booleano indicando se o exercício foi deletado.
   */
  static async deleteWorkoutExercise(id: number) {
    const workoutExercise = await WorkoutExercise.findByPk(id);
    if (workoutExercise) {
      await workoutExercise.destroy();
      return true;
    }
    return false;
  }
}
