import {
    Table, Column, Model, DataType,
    CreatedAt, UpdatedAt, PrimaryKey,
    HasMany
  } from 'sequelize-typescript';
  import { ExerciseInstruction } from './ExerciseInstruction';
  import { ExerciseSecundaryMuscle } from './ExerciseSecundaryMuscle';
  
  @Table({
    tableName: 'Exercises',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  export class Exercise extends Model<Exercise> {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    body_part!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    target!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    equipment!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    gif_url!: string;
  
    @HasMany(() => ExerciseInstruction)
    instructions!: ExerciseInstruction[];   // 1:N Instruction :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
  
    @HasMany(() => ExerciseSecundaryMuscle)
    secundaryMuscles!: ExerciseSecundaryMuscle[]; // 1:N SecundaryMuscles :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}
  
    @CreatedAt created_at!: Date;
    @UpdatedAt updated_at!: Date;
  }
  