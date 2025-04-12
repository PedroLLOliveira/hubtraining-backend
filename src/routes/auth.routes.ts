import { Router } from 'express';
import { authController } from '../controllers/AuthController';

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Dados para registro de um novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               user_type:
 *                 type: string
 *                 enum: [personal, student_with_personal, student]
 *                 example: "personal"
 *             required:
 *               - name
 *               - email
 *               - password
 *               - user_type
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       400:
 *         description: Dados inválidos ou erro na criação do usuário.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Credenciais do usuário para login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna o token JWT.
 *       400:
 *         description: Credenciais inválidas.
 */
router.post('/login', authController.login);

export default router;
