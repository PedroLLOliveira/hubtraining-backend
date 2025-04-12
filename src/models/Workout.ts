import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'Workouts',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Workout extends Model<Workout> {
  // Campo que referencia o usuário que criou o treino
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  creator_id!: number;

  // Campo opcional que referencia o aluno para quem o treino foi criado
  @ForeignKey(() => User)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER })
  student_id?: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name!: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  description?: string;

  @AllowNull(false)
  @Default('private')
  @Column({ type: DataType.ENUM('private', 'public') })
  visibility!: 'private' | 'public';

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  duration!: number; // Duração do treino em minutos

  @AllowNull(false)
  @Column({ type: DataType.ENUM('easy', 'medium', 'hard') })
  difficulty_level!: 'easy' | 'medium' | 'hard';

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at!: Date;
}
