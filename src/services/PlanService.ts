// src/services/PlanService.ts
import { Plan } from '../models/Plan';

export const planService = {
  /**
   * Cria um novo plano no banco de dados.
   * @param data Dados do plano.
   * @returns Plano criado.
   */
  async createPlan(data: any) {
    return await Plan.create(data);
  },

  /**
   * Retorna todos os planos.
   * @returns Lista de planos.
   */
  async getAllPlans() {
    return await Plan.findAll();
  },

  /**
   * Retorna um plano pelo ID.
   * @param id ID do plano.
   * @returns Plano encontrado.
   */
  async getPlanById(id: number) {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }
    return plan.dataValues;
  },

  /**
   * Atualiza um plano pelo ID.
   * @param id ID do plano.
   * @param updates Dados para atualização.
   * @returns Plano atualizado.
   */
  async updatePlan(id: number, updates: any) {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }
    return await plan.update(updates);
  },

  /**
   * Exclui um plano pelo ID.
   * @param id ID do plano.
   * @returns Resultado da exclusão.
   */
  async deletePlan(id: number) {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }
    return await plan.destroy();
  },
};
