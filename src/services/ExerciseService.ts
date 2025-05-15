// services/exercise.service.ts
import { Exercise } from '../models/Exercise';
import { ExerciseInstruction } from '../models/ExerciseInstruction';
import { ExerciseSecundaryMuscle } from '../models/ExerciseSecundaryMuscle';

export class ExerciseService {
  async findAll(): Promise<Exercise[]> {
    return Exercise.findAll({
      include: [ExerciseInstruction, ExerciseSecundaryMuscle]
    });
  }

  async findById(id: string): Promise<Exercise | null> {
    return Exercise.findByPk(id, {
      include: [ExerciseInstruction, ExerciseSecundaryMuscle]
    });
  }

  async createWithRelations(payload: any): Promise<Exercise> {
    return Exercise.create(payload, {
      include: [
        { model: ExerciseInstruction, as: 'instructions' },
        { model: ExerciseSecundaryMuscle, as: 'secundaryMuscles' }
      ]
    });
  }

  async update(id: string, data: Partial<Exercise>): Promise<[number]> {
    return Exercise.update(data, { where: { id } });
  }

  async delete(id: string): Promise<number> {
    return Exercise.destroy({ where: { id } });
  }
}
