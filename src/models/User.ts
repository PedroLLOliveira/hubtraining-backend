import { Table, Column, Model, DataType, AllowNull, Default, PrimaryKey, Unique, IsEmail } from 'sequelize-typescript';
import { HashService } from '../utils/auth/hash.service';

@Table({
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
  @Column({ type: DataType.STRING })
  password_hash!: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  phone_number?: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  profile_picture_url?: string;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  date_of_birth?: Date;

  @AllowNull(false)
  @Column({ type: DataType.ENUM('personal', 'student') })
  role!: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;  // Manter 'created_at' como nome

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at!: Date;  // Manter 'updated_at' como nome

  /**
   * Método para verificar a senha
   * @param password Senha fornecida.
   * @returns Retorna `true` se a senha for válida, caso contrário, `false`.
   */
  async checkPassword(password: string): Promise<boolean> {
    return HashService.comparePassword(password, this.password_hash);
  }
}
