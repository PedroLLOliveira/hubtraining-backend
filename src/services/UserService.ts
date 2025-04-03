import { User } from '../models/User';
import { HashService } from '../utils/auth/hash.service';

export class UserService {
  /**
   * Cria um novo usuário no banco de dados.
   * @param userData Dados do usuário para criação.
   * @returns Retorna o usuário criado.
   */
  static async createUser(userData: any) {
    const user = await User.create(userData);
    return user;
  }

  /**
   * Encontra um usuário pelo email.
   * @param email Email do usuário.
   * @returns Retorna o usuário encontrado ou null.
   */
  static async findUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  /**
   * Verifica se a senha fornecida corresponde ao hash armazenado.
   * @param password Senha fornecida.
   * @param user Usuário com a senha armazenada.
   * @returns Retorna `true` se a senha for válida, caso contrário, `false`.
   */
  static async checkPassword(password: string, user: any) {
    return HashService.comparePassword(password, user.password_hash);
  }
}
