'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tabela WorkoutLikes: armazena os likes dados pelos usuários nas fichas de treino.
    await queryInterface.createTable('WorkoutLikes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workouts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER, // Alterado de UUID para INTEGER conforme a nova modelagem
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      }
    });

    // Tabela WorkoutRankings: armazena o ranking das fichas de treino com base nos likes recebidos.
    await queryInterface.createTable('WorkoutRankings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workouts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      likes_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkoutRankings');
    await queryInterface.dropTable('WorkoutLikes');
  }
};
