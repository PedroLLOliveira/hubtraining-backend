import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  Unique,
  IsEmail,
} from 'sequelize-typescript';
import { HashService } from '../utils/auth/hash.service';

@Table({
  tableName: 'Users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<User> {
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name!: string;

  @AllowNull(false)
  @Unique('email')
  @IsEmail
  @Column({ type: DataType.STRING })
  email!: string;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  email_verified!: boolean;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  password_hash!: string;

  @AllowNull(false)
  @Column({ type: DataType.ENUM('personal', 'student_with_personal', 'student') })
  user_type!: 'personal' | 'student_with_personal' | 'student';

  @AllowNull(true)
  @Column({ type: DataType.INTEGER })
  personal_id?: number;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  phone_number?: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  profile_picture_url?: string;

  @AllowNull(true)
  @Column({ type: DataType.DATEONLY })
  date_of_birth?: Date;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  gender?: string;

  @AllowNull(false)
  @Default('ativo')
  @Column({ type: DataType.ENUM('ativo', 'inativo') })
  status!: 'ativo' | 'inativo';

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  last_login_at?: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at!: Date;

  /**
   * Método para verificar a senha
   * @param password Senha fornecida.
   * @returns Retorna `true` se a senha for válida, caso contrário, `false`.
   */
  async checkPassword(password: string): Promise<boolean> {
    return HashService.comparePassword(password, this.password_hash);
  }
}
