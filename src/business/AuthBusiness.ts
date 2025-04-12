import { UserService } from '../services/UserService';
import { JwtService } from '../utils/auth/jwt.service';
import { HashService } from '../utils/auth/hash.service';

class AuthBusiness {
  /**
   * Método para registrar um novo usuário
   * @param userData Dados do usuário para cadastro.
   * @returns Retorna o usuário criado.
   */
  async register(userData: any) {
    const { password, ...rest } = userData;

    const hashedPassword = await HashService.hashPassword(password);

    const user = await UserService.createUser({ ...rest, password_hash: hashedPassword });
    
    return user;
  }

  /**
   * Método para realizar login do usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Retorna o token JWT se as credenciais forem válidas.
   */
  async login(email: string, password: string) {
    const user = await UserService.findUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    if (!user?.dataValues.password_hash) {
        throw new Error('Password hash not found');
    }

    const isPasswordValid = await HashService.comparePassword(password, user?.dataValues.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = await JwtService.getInstance().sign({ userId: user.dataValues.id });
    return { token };
  }
}

export const authBusiness = new AuthBusiness();
