import {
  Table, Column, Model, DataType,
  CreatedAt, UpdatedAt, PrimaryKey,
  ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { User } from './User';  // supondo existir
import { WorkoutExercise } from './WorkoutExercise';

@Table({
  tableName: 'Workouts',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Workout extends Model<Workout> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  creator_id!: number;

  @BelongsTo(() => User, 'creator_id')
  creator!: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  student_id!: number | null;

  @BelongsTo(() => User, 'student_id')
  student!: User | null;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description!: string;

  @Column({
    type: DataType.ENUM('private','public'),
    allowNull: false,
    defaultValue: 'private'
  })
  visibility!: 'private' | 'public';

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration!: number;

  @Column({
    type: DataType.ENUM('easy','medium','hard'),
    allowNull: false
  })
  difficulty_level!: 'easy' | 'medium' | 'hard';

  @HasMany(() => WorkoutExercise)
  exercises!: WorkoutExercise[];

  @CreatedAt created_at!: Date;
  @UpdatedAt updated_at!: Date;
}
