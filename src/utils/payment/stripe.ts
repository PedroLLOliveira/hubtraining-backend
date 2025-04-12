// src/services/paymentService.ts
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil',
});

/**
 * Cria um cliente na Stripe.
 * @param email - Email do cliente.
 * @param name - Nome do cliente.
 * @returns O objeto Customer da Stripe.
 */
export const createCustomer = async (email: string, name: string): Promise<Stripe.Customer> => {
  try {
    const customer = await stripe.customers.create({ email, name });
    return customer;
  } catch (error: any) {
    throw new Error(`Erro ao criar cliente no Stripe: ${error.message}`);
  }
};

/**
 * Cria uma assinatura na Stripe.
 * @param customerId - ID do cliente na Stripe.
 * @param priceId - ID do preço na Stripe.
 * @returns A assinatura criada (Subscription) da Stripe.
 */
export const createSubscription = async (
  customerId: string,
  priceId: string
): Promise<Stripe.Subscription> => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
    });
    return subscription;
  } catch (error: any) {
    throw new Error(`Erro ao criar assinatura: ${error.message}`);
  }
};

/**
 * Cria uma Checkout Session para assinaturas.
 * @param customerId - ID do cliente na Stripe.
 * @param priceId - ID do preço (do plano) na Stripe.
 * @returns A URL da sessão de checkout para redirecionar o usuário.
 */
export const createCheckoutSession = async (
  customerId: string,
  priceId: string
): Promise<Stripe.Checkout.Session> => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      // URLs de sucesso e cancelamento após o checkout
      success_url: `${process.env.STRIPE_SUCCESS_URL || 'http://localhost:5000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL || 'http://localhost:5000'}/checkout/cancel`,
    });
    return session;
  } catch (error: any) {
    throw new Error(`Erro ao criar Checkout Session: ${error.message}`);
  }
};
