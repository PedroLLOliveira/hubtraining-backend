import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { userPlanService, updateUserPlanPaymentStatus } from '../services/UserPlanService';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil',
});

/**
 * Webhook para receber eventos da Stripe.
 * Este endpoint deve ser configurado na sua conta Stripe como URL de webhook.
 * 
 * IMPORTANTE: Este middleware deve ser registrado ANTES de qualquer
 * middleware de parsing (como express.json()) na sua aplicação principal.
 */
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

    if (!sig) {
      console.error('Erro: Cabeçalho stripe-signature ausente');
      res.status(400).send('Webhook Error: Cabeçalho stripe-signature ausente');
      return;
    }

    if (!webhookSecret) {
      console.error('Erro: STRIPE_WEBHOOK_KEY não está definido no ambiente');
      res.status(500).send('Webhook Error: Configuração incompleta do webhook');
      return;
    }

    let event: Stripe.Event;
    try {
      // Constrói o evento a partir do body raw, da assinatura e da chave do webhook
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Erro na validação do webhook:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Trata os eventos que impactam o UserPlan e atualiza o payment_status no banco
    switch (event.type) {
      // Quando a assinatura é criada, cria o registro do UserPlan com status inicial
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionData = {
          stripe_subscription_id: subscription.id,
          // Se a assinatura está ativa, pode ser considerado pago; caso contrário, pendente.
          payment_status: subscription.status === 'active' ? 'pago' : 'pendente',
          // Você pode salvar outros atributos, como:
          // customer: subscription.customer,
          // plan: subscription.items.data[0]?.plan?.id,
          // start_date: subscription.start_date,
        };
        try {
          await userPlanService.createUserPlan(subscriptionData);
          console.log('UserPlan criado com sucesso para a subscription:', subscription.id);
        } catch (error) {
          console.error('Erro ao criar UserPlan para a subscription:', subscription.id, error);
        }
        break;
      }

      // Quando o checkout é concluído e o pagamento confirmado, atualiza para "pago"
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription && session.payment_status === 'paid') {
          const subscriptionId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;
          try {
            await updateUserPlanPaymentStatus(subscriptionId, 'pago');
            console.log('UserPlan atualizado para pago via checkout.session.completed:', subscriptionId);
          } catch (error) {
            console.error('Erro ao atualizar UserPlan via checkout.session.completed:', subscriptionId, error);
          }
        }
        break;
      }

      // Pagamento da invoice bem-sucedido: atualiza o status para "pago"
      case 'invoice.payment_succeeded': {
        const invoice: any = event.data.object as Stripe.Invoice;
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id;
        if (subscriptionId) {
          try {
            await updateUserPlanPaymentStatus(subscriptionId, 'pago');
            console.log('UserPlan atualizado para pago via invoice.payment_succeeded:', subscriptionId);
          } catch (error) {
            console.error('Erro ao atualizar UserPlan via invoice.payment_succeeded:', subscriptionId, error);
          }
        } else {
          console.error('Invoice sem ID de assinatura:', invoice.id);
        }
        break;
      }

      // Pagamento da invoice falhou: atualiza o status para "falhou"
      case 'invoice.payment_failed': {
        const invoice: any = event.data.object as Stripe.Invoice;
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id;
        if (subscriptionId) {
          try {
            await updateUserPlanPaymentStatus(subscriptionId, 'falhou');
            console.log('UserPlan atualizado para falhou via invoice.payment_failed:', subscriptionId);
          } catch (error) {
            console.error('Erro ao atualizar UserPlan via invoice.payment_failed:', subscriptionId, error);
          }
        } else {
          console.error('Invoice sem ID de assinatura:', invoice.id);
          console.error('Evento completo:', event);
        }
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
        console.log('Evento completo:', event);
    }

    res.json({ received: true });
  }
);

export default router;
