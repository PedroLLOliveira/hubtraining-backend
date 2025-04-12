'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false, // valor em centavos
      },
      plan_type: {
        type: Sequelize.STRING,
        allowNull: false, // exemplo: 'mensal', 'trimestral', 'anual'
      },
      max_users: {
        type: Sequelize.INTEGER,
        allowNull: true, // aplicável para planos de personal
      },
      status: {
        type: Sequelize.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo',
      },
      stripe_price_id: {
        type: Sequelize.STRING,
        allowNull: true, // ID do preço no Stripe
      },
      stripe_product_id: {
        type: Sequelize.STRING,
        allowNull: true, // ID do produto no Stripe
      },
      billing_interval: {
        type: Sequelize.STRING,
        allowNull: false, // exemplo: 'mensal', 'anual'
      },
      trial_period_days: {
        type: Sequelize.INTEGER,
        allowNull: true, // dias de período de teste (opcional)
      },
      features: {
        type: Sequelize.JSON,
        allowNull: true, // recursos incluídos no plano
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plans');
  }
};
