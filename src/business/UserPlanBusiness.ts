// src/business/UserPlanBusiness.ts
import { planService } from '../services/PlanService';
import { createCustomer, createCheckoutSession } from '../utils/payment/stripe';

export const userPlanBusiness = {
  /**
   * Processa o checkout de uma assinatura: cria o cliente na Stripe, gera a Checkout Session
   * e, após confirmação do pagamento (via webhook), registra a assinatura no banco (UserPlans).
   *
   * @param checkoutData - Objeto contendo os dados necessários para o checkout:
   *   - user_id: Número identificador do usuário.
   *   - name: Nome do usuário.
   *   - email: Email do usuário.
   *   - plan_id: Número identificador do plano a ser adquirido.
   * @returns Retorna um objeto com a URL da Checkout Session e, opcionalmente, outros dados.
   */
  async checkout(checkoutData: { user_id: number; name: string; email: string; plan_id: number; }): Promise<any> {
    const plan = await planService.getPlanById(checkoutData.plan_id);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }
    if (!plan.stripe_price_id) {
      throw new Error('O plano não possui um preço configurado na Stripe');
    }

    const stripeCustomer = await createCustomer(checkoutData.email, checkoutData.name);
    console.log('Cliente criado na Stripe:', stripeCustomer);

    // Cria a Checkout Session para o cliente pagar a assinatura
    const session = await createCheckoutSession(stripeCustomer.id, plan.stripe_price_id);
    console.log('Checkout Session criada:', session);

    // Aqui, a criação do registro em UserPlans pode ser realizada após a confirmação do pagamento
    // via webhook (assumindo que, inicialmente, você queira apenas retornar a URL para o front-end).
    
    // Você pode, se desejar, retornar apenas a URL:
    return { checkoutUrl: session.url };
  },
};
