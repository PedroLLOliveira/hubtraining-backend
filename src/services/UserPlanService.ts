// src/services/userPlanService.ts
import { UserPlan } from '../models/UserPlan';

/**
 * Service para operações de UserPlan no banco de dados.
 */
export const userPlanService = {
  /**
   * Cria um registro de assinatura (UserPlan) no banco de dados.
   * @param data Dados a serem salvos para o UserPlan.
   * @returns O registro criado no banco.
   */
  async createUserPlan(data: any) {
    return await UserPlan.create(data);
  },
};

/**
 * Atualiza o status de pagamento de um UserPlan com base no ID da assinatura da Stripe.
 * @param stripeSubscriptionId ID da assinatura na Stripe.
 * @param paymentStatus Novo status de pagamento ('pago', 'falhou', etc.).
 * @returns O registro atualizado.
 */
export const updateUserPlanPaymentStatus = async (stripeSubscriptionId: string, paymentStatus: string): Promise<UserPlan | null> => {
  // Busca o registro que possua o mesmo stripe_subscription_id
  const userPlan = await UserPlan.findOne({ where: { stripe_subscription_id: stripeSubscriptionId } });
  if (!userPlan) {
    console.error(`UserPlan com stripe_subscription_id ${stripeSubscriptionId} não encontrado.`);
    return null;
  }
  // Atualiza o status de pagamento
  userPlan.payment_status = paymentStatus as 'pendente' | 'pago' | 'falhou';
  await userPlan.save();
  return userPlan;
};
