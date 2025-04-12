// src/business/PlanBusiness.ts
import { planService } from '../services/PlanService';
import { stripePlanService } from '../services/stripePlanService';

export const planBusiness = {
  /**
   * Cria um novo plano integrando com a Stripe e salvando os dados no banco.
   * @param planData Dados recebidos para criação do plano.
   * @returns Plano criado.
   */
  async createPlan(planData: any) {
    // Validações e transformações podem ser realizadas aqui.
    // Se necessário, mapeie valores (por exemplo, de 'mensal' para 'month')
    const billingIntervalMap: Record<string, string> = {
      mensal: 'month',
      anual: 'year',
    };
    const stripeInterval = billingIntervalMap[planData.billing_interval] || planData.billing_interval;

    // Criação do produto na Stripe
    const product = await stripePlanService.createProduct(planData.name, planData.description);

    // Criação do preço na Stripe com o valor (em centavos)
    const stripePrice = await stripePlanService.createPrice({
      unit_amount: planData.price,
      currency: 'usd', // ou ajuste conforme necessário
      recurring_interval: stripeInterval,
      product: product.id,
    });

    // Salva o plano no banco com os IDs da Stripe
    const newPlan = await planService.createPlan({
      ...planData,
      status: 'ativo',
      stripe_product_id: product.id,
      stripe_price_id: stripePrice.id,
    });
    return newPlan;
  },

  /**
   * Retorna a lista de todos os planos.
   * @returns Lista de planos.
   */
  async getPlans() {
    return await planService.getAllPlans();
  },

  /**
   * Atualiza um plano.
   * @param id ID do plano.
   * @param updates Dados para atualização.
   * @returns Plano atualizado.
   */
  async updatePlan(id: number, updates: any) {
    // Em caso de atualização de informações que envolvem a Stripe (ex.: nome, descrição),
    // pode ser necessário atualizar também o produto na Stripe.
    // Essa lógica pode ser implementada aqui se necessário.
    return await planService.updatePlan(id, updates);
  },

  /**
   * Exclui um plano.
   * @param id ID do plano.
   * @returns Mensagem de sucesso.
   */
  async deletePlan(id: number) {
    return await planService.deletePlan(id);
  },
};
