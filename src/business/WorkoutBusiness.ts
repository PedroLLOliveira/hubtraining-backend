// business/workout.business.ts
import { WorkoutService } from '../services/WorkoutService';

export class WorkoutBusiness {
  private svc = new WorkoutService();

  async listAll() {
    return this.svc.findAll();
  }

  async getById(id: number) {
    const wk = await this.svc.findById(id);
    if (!wk) throw new Error('Workout não encontrado');
    return wk;
  }

  async create(payload: any) {
    // validar nome, duration etc.
    return this.svc.create(payload);
  }

  async update(id: number, payload: any) {
    const [updated] = await this.svc.update(id, payload);
    if (!updated) throw new Error('Nenhum workout atualizado');
    return this.getById(id);
  }

  async remove(id: number) {
    const deleted = await this.svc.delete(id);
    if (!deleted) throw new Error('Nenhum workout removido');
    return { message: 'Workout deletado com sucesso' };
  }

  // gestão de exercícios:
  async addExercise(workoutId: number, payload: any) {
    return this.svc.addExercise(workoutId, payload);
  }

  async updateExercise(weId: number, payload: any) {
    const [u] = await this.svc.updateExercise(weId, payload);
    if (!u) throw new Error('Não foi possível atualizar exercício do workout');
    return { message: 'Exercício atualizado' };
  }

  async removeExercise(weId: number) {
    const d = await this.svc.removeExercise(weId);
    if (!d) throw new Error('Não foi possível remover exercício do workout');
    return { message: 'Exercício removido' };
  }
}
