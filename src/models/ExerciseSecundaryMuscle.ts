import {
    Table, Column, Model, DataType,
    CreatedAt, UpdatedAt, ForeignKey,
    BelongsTo, PrimaryKey
  } from 'sequelize-typescript';
  import { Exercise } from './Exercise';
  
  @Table({
    tableName: 'ExerciseSecundaryMuscles',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  export class ExerciseSecundaryMuscle extends Model<ExerciseSecundaryMuscle> {
    @ForeignKey(() => Exercise)
    @Column({ type: DataType.STRING, allowNull: false })
    exercise_id!: string;
  
    @BelongsTo(() => Exercise)
    exercise!: Exercise;
  
    @Column({ type: DataType.STRING, allowNull: false })
    muscle!: string;
  
    @CreatedAt created_at!: Date;
    @UpdatedAt updated_at!: Date;
  }
  