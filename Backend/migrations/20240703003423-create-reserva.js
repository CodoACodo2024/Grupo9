'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      lavanderia_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lavanderias',
          key: 'id'
        }
      },
      fecha: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.TIME
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'confirmada', 'cancelada')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservas');
  }
};
