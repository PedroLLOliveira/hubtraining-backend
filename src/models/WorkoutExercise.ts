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
  tableName: 'WorkoutExercises',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class WorkoutExercise extends Model<WorkoutExercise> {
  @ForeignKey(() => Workout)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  workout_id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  exercise_name!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  exercise_type!: string; // Exemplos: 'aeróbico', 'força', 'alongamento', etc.

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  description?: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  sets!: number; // Número de séries

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  reps!: number; // Número de repetições por série

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  rest_time!: number; // Tempo de descanso entre séries (em segundos)

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  media_url?: string; // URL do vídeo ou imagem demonstrativa do exercício

  @AllowNull(false)
  @Column({ type: DataType.ENUM('video', 'image') })
  media_type!: 'video' | 'image';

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at!: Date;
}
