import {
  Table, Column, Model, DataType,
  CreatedAt, UpdatedAt, ForeignKey,
  BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import { Workout } from './Workout';
import { Exercise } from './Exercise';

@Table({
  tableName: 'WorkoutExercises',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class WorkoutExercise extends Model<WorkoutExercise> {
  @ForeignKey(() => Workout)
  @Column({ type: DataType.INTEGER, allowNull: false })
  workout_id!: number;

  @BelongsTo(() => Workout)
  workout!: Workout;

  @ForeignKey(() => Exercise)
  @Column({ type: DataType.STRING, allowNull: false })
  exercise_id!: string;

  @BelongsTo(() => Exercise)
  exercise!: Exercise;

  @Column({ type: DataType.INTEGER, allowNull: false })
  sets!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  reps!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rest_time!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  order!: number;

  @CreatedAt created_at!: Date;
  @UpdatedAt updated_at!: Date;
}
