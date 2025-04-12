import { Request, Response } from 'express';
import { authBusiness } from '../business/AuthBusiness';

class AuthController {
  /**
   * Controlador para registrar um novo usuário
   * @param req Objeto de requisição contendo os dados do usuário.
   * @param res Objeto de resposta para enviar o resultado ao cliente.
   * @returns Retorna o usuário criado com status 201.
   */
  async register(req: Request, res: Response) {
    try {
        const user = await authBusiness.register(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
  }

  /**
   * Controlador para realizar login do usuário
   * @param req Objeto de requisição contendo o email e a senha do usuário.
   * @param res Objeto de resposta para enviar o token JWT ou erro ao cliente.
   * @returns Retorna o token JWT se as credenciais forem válidas.
   */
  async login(req: Request, res: Response) {
    try {
        const token = await authBusiness.login(req.body.email, req.body.password);
        res.json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
