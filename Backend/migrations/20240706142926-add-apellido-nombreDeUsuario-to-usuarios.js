'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'apellido', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Usuarios', 'nombreDeUsuario', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'apellido');
    await queryInterface.removeColumn('Usuarios', 'nombreDeUsuario');
  }
};
