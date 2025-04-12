// src/types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload | { id: number; email: string; user_type: string; [key: string]: any };
    }
  }
}
