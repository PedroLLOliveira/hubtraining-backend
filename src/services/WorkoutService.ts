// services/workout.service.ts
import { Workout } from '../models/Workout';
import { WorkoutExercise } from '../models/WorkoutExercise';

export class WorkoutService {
  async findAll(): Promise<Workout[]> {
    return Workout.findAll({ include: [WorkoutExercise] });
  }

  async findById(id: number): Promise<Workout | null> {
    return Workout.findByPk(id, { include: [WorkoutExercise] });
  }

  async create(data: Partial<Workout>): Promise<Workout> {
    return Workout.create(data as any);
  }

  async update(id: number, data: Partial<Workout>): Promise<[number]> {
    return Workout.update(data, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return Workout.destroy({ where: { id } });
  }

  // Para gerenciar exercícios do workout:
  async addExercise(workoutId: number, payload: Partial<WorkoutExercise>) {
    return WorkoutExercise.create({ workout_id: workoutId, ...payload } as any);
  }

  async updateExercise(weId: number, data: Partial<WorkoutExercise>) {
    return WorkoutExercise.update(data, { where: { id: weId } });
  }

  async removeExercise(weId: number) {
    return WorkoutExercise.destroy({ where: { id: weId } });
  }
}
