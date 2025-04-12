'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPlans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      plan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Plans',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      renewals_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM('ativa', 'inativa'),
        allowNull: false,
        defaultValue: 'ativa',
      },
      stripe_subscription_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stripe_customer_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      current_period_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      current_period_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cancel_at_period_end: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      payment_status: {
        type: Sequelize.ENUM('pendente', 'pago', 'falhou'),
        allowNull: false,
        defaultValue: 'pendente',
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
    await queryInterface.dropTable('UserPlans');
  }
};
