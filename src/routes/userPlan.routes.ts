// src/routes/userPlan.routes.ts
import { Router } from 'express';
import { userPlanController } from '../controllers/UserPlanController';

const router = Router();

/**
 * @swagger
 * /user-plans/checkout:
 *   post:
 *     summary: Efetua o checkout da assinatura e salva os dados no sistema.
 *     tags:
 *       - UserPlans
 *     requestBody:
 *       description: Dados do usuário e do plano para assinatura.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 example: 123
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               plan_id:
 *                 type: number
 *                 example: 1
 *             required:
 *               - user_id
 *               - name
 *               - email
 *               - plan_id
 *     responses:
 *       201:
 *         description: Assinatura efetuada com sucesso.
 *       400:
 *         description: Erro ao processar o checkout.
 */
router.post('/checkout', userPlanController.checkout);

export default router;
