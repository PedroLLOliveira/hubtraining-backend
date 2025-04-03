import { Request, Response } from 'express';
import { authBusiness } from '../business/AuthBusiness';

class AuthController {
  async register(req: Request, res: Response) {
    try {
        const user = await authBusiness.register(req.body);

        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
  }

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
