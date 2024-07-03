'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lavanderias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios', // Nombre de la tabla referenciada
          key: 'id'
        }
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      horario: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Lavanderias');
  }
};
