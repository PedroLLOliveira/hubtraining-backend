import {
    Table, Column, Model, DataType,
    CreatedAt, UpdatedAt, ForeignKey,
    BelongsTo, PrimaryKey
  } from 'sequelize-typescript';
  import { Exercise } from './Exercise';
  
  @Table({
    tableName: 'ExerciseInstructions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  export class ExerciseInstruction extends Model<ExerciseInstruction> {
    @ForeignKey(() => Exercise)
    @Column({ type: DataType.STRING, allowNull: false })
    exercise_id!: string;
  
    @BelongsTo(() => Exercise)
    exercise!: Exercise;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    step_number!: number;
  
    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;
  
    @CreatedAt created_at!: Date;
    @UpdatedAt updated_at!: Date;
  }
  