// src/services/stripePlanService.ts
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil', // Use a versão configurada
});

export const stripePlanService = {
  /**
   * Cria um produto na Stripe.
   * @param name Nome do produto.
   * @param description Descrição do produto.
   * @returns Produto criado na Stripe.
   */
  async createProduct(name: string, description: string) {
    try {
      const product = await stripe.products.create({ name, description });
      return product;
    } catch (error: any) {
      throw new Error(`Erro ao criar produto na Stripe: ${error.message}`);
    }
  },

  /**
   * Cria um preço recorrente na Stripe para um produto.
   * @param param0 Objeto com unit_amount, currency, recurring_interval e product.
   * @returns Preço criado na Stripe.
   */
  async createPrice({ unit_amount, currency, recurring_interval, product }: { unit_amount: number; currency: string; recurring_interval: 'day' | 'week' | 'month' | 'year'; product: string; }) {
    try {
      const price = await stripe.prices.create({
        unit_amount,
        currency,
        recurring: { interval: recurring_interval },
        product,
      });
      return price;
    } catch (error: any) {
      throw new Error(`Erro ao criar preço na Stripe: ${error.message}`);
    }
  },
};
