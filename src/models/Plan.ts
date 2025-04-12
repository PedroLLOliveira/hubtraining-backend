import { 
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default
} from 'sequelize-typescript';

@Table({
  tableName: 'Plans',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Plan extends Model<Plan> {

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  description!: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  price!: number; // Preço em centavos

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  plan_type!: string; // Exemplo: 'mensal', 'trimestral', 'anual'

  @AllowNull(true)
  @Column({ type: DataType.INTEGER })
  max_users?: number;

  @AllowNull(false)
  @Default('ativo')
  @Column({ type: DataType.ENUM('ativo', 'inativo') })
  status!: 'ativo' | 'inativo';

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  stripe_price_id?: string; // ID do preço no Stripe

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  stripe_product_id?: string; // ID do produto no Stripe

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  billing_interval!: string; // Exemplo: 'mensal', 'anual'

  @AllowNull(true)
  @Column({ type: DataType.INTEGER })
  trial_period_days?: number; // Dias de período de teste (opcional)

  @AllowNull(true)
  @Column({ type: DataType.JSON })
  features?: any; // Recursos incluídos no plano (JSON)

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  updated_at!: Date;
}