import { 
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default
} from 'sequelize-typescript';

@Table({
  tableName: 'UserPlans',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UserPlan extends Model<UserPlan> {
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  user_id!: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  plan_id!: number;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  start_date!: Date;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  end_date?: Date;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.INTEGER })
  renewals_count!: number;

  @AllowNull(false)
  @Default('ativa')
  @Column({ type: DataType.ENUM('ativa', 'inativa') })
  status!: 'ativa' | 'inativa';

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  stripe_subscription_id?: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  stripe_customer_id?: string;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  current_period_start!: Date;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  current_period_end!: Date;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  cancel_at_period_end!: boolean;

  @AllowNull(false)
  @Default('pendente')
  @Column({ type: DataType.ENUM('pendente', 'pago', 'falhou') })
  payment_status!: 'pendente' | 'pago' | 'falhou';

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at!: Date;
}