import { Request, Response } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeController {
  /**
   * Controlador para criar uma sessão de checkout do Stripe
   * @param req Dados do plano (ID do plano)
   * @param res Redireciona para a URL do Stripe Checkout
   * @returns Retorna a URL de redirecionamento para o Stripe
   */
  async createCheckoutSession(req: Request, res: Response): Promise<void> {
    try {
      const { planId } = req.body;

      // Crie uma sessão de checkout no Stripe usando o ID do preço
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: planId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });

      // Retorne a URL da sessão de checkout para o frontend
      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: 'Erro ao criar sessão de checkout: ' + error.message });
    }
  }
}

export const stripeController = new StripeController();
