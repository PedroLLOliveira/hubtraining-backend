// src/controllers/PlanController.ts
import { Request, Response } from 'express';
import { planBusiness } from '../business/PlanBusiness';

class PlanController {
  /**
   * Controlador para criar um novo plano.
   * @param req Objeto de requisição contendo os dados do plano.
   * @param res Objeto de resposta para enviar o resultado ao cliente.
   * @returns Retorna o plano criado com status 201.
   */
  async create(req: Request, res: Response) {
    try {
      const plan = await planBusiness.createPlan(req.body);
      res.status(201).json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para listar todos os planos.
   * @param req Objeto de requisição.
   * @param res Objeto de resposta contendo a lista de planos.
   * @returns Retorna a lista de planos com status 200.
   */
  async list(req: Request, res: Response) {
    try {
      const plans = await planBusiness.getPlans();
      res.status(200).json(plans);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Controlador para atualizar um plano.
   * @param req Objeto de requisição com o ID do plano nos parâmetros e os dados a serem atualizados no corpo.
   * @param res Objeto de resposta com o plano atualizado.
   * @returns Retorna o plano atualizado com status 200.
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedPlan = await planBusiness.updatePlan(Number(id), req.body);
      res.status(200).json(updatedPlan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para excluir um plano.
   * @param req Objeto de requisição contendo o ID do plano nos parâmetros.
   * @param res Objeto de resposta com a mensagem de sucesso.
   * @returns Retorna uma mensagem de confirmação com status 200.
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await planBusiness.deletePlan(Number(id));
      res.status(200).json({ message: 'Plano excluído com sucesso' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const planController = new PlanController();
