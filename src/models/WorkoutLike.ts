import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  Default,
} from 'sequelize-typescript';
import { Workout } from './Workout';
import { User } from './User';

@Table({
  tableName: 'WorkoutLikes',
  timestamps: false, // Desabilita a criação automática de updated_at
})
export class WorkoutLike extends Model<WorkoutLike> {
  @ForeignKey(() => Workout)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  workout_id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER }) // Alterado para INTEGER conforme a migration
  user_id!: number;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;
}
