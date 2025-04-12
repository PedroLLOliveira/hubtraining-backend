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

@Table({
  tableName: 'WorkoutRankings',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class WorkoutRanking extends Model<WorkoutRanking> {
  @ForeignKey(() => Workout)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  workout_id!: number;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.INTEGER })
  likes_count!: number;
  
  // Os campos created_at e updated_at serão gerenciados automaticamente conforme o mapeamento acima.
}
