'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkoutExercises', {
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
      exercise_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exercise_type: {
        type: Sequelize.STRING,
        allowNull: false, // Exemplo: 'aeróbico', 'força', 'alongamento', etc.
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      sets: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reps: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rest_time: {
        type: Sequelize.INTEGER,
        allowNull: false, // Tempo de descanso entre séries em segundos
      },
      media_url: {
        type: Sequelize.STRING,
        allowNull: true, // URL do vídeo ou imagem demonstrativa do exercício
      },
      media_type: {
        type: Sequelize.ENUM('video', 'image'),
        allowNull: false,
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
    await queryInterface.dropTable('WorkoutExercises');
  }
};
