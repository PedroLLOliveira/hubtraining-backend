// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Middleware para autenticação por token JWT.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera um header no formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
    // Armazena os dados decodificados na propriedade user da request
    req.user = decoded as Express.Request['user'];
    next();
  });
};

/**
 * Middleware para restringir o acesso a apenas personal trainers.
 */
export const isPersonal = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.user_type === 'personal') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso restrito a personal trainers' });
  }
};
