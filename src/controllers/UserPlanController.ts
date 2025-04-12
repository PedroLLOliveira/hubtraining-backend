// src/controllers/UserPlanController.ts
import { Request, Response } from 'express';
import { userPlanBusiness } from '../business/UserPlanBusiness';

class UserPlanController {
  /**
   * Controlador para iniciar o checkout de uma assinatura.
   * Cria o cliente na Stripe e gera uma Checkout Session.
   * @param req Objeto de requisição contendo os dados para o checkout.
   * @param res Objeto de resposta que retorna a URL da Checkout Session.
   */
  async checkout(req: Request, res: Response) {
    try {
      const checkoutData = req.body;
      const result = await userPlanBusiness.checkout(checkoutData);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const userPlanController = new UserPlanController();
