// business/exercise.business.ts
import { ExerciseService } from '../services/ExerciseService';

export class ExerciseBusiness {
  private service = new ExerciseService();

  async listAll() {
    return this.service.findAll();
  }

  async getById(id: string) {
    const ex = await this.service.findById(id);
    if (!ex) throw new Error('Exercise not found');
    return ex;
  }

  async create(payload: any) {
    // ex.: validar campos obrigatórios, checar duplicidade etc.
    if (!payload.id || !payload.name) {
      throw new Error('ID e nome são obrigatórios');
    }
    return this.service.createWithRelations(payload);
  }

  async update(id: string, payload: any) {
    const [updated] = await this.service.update(id, payload);
    if (!updated) throw new Error('Nenhum registro atualizado');
    return this.getById(id);
  }

  async remove(id: string) {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new Error('Nenhum registro removido');
    return { message: 'Exercise deletado com sucesso' };
  }
}
