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
    // Hash da senha do usuário
    const hashedPassword = await HashService.hashPassword(password);
    // Criação do usuário
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
    // Verificar se o usuário foi encontrado
    if (!user) {
        throw new Error('User not found');
    }

    // Verificar se o password_hash está definido antes de compará-lo
    if (!user?.dataValues.password_hash) {
        throw new Error('Password hash not found');
    }

    // Comparar a senha fornecida com o hash armazenado
    const isPasswordValid = await HashService.comparePassword(password, user?.dataValues.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Gerar o token JWT
    const token = await JwtService.getInstance().sign({ userId: user.dataValues.id });
    return { token };
  }
}

export const authBusiness = new AuthBusiness();
