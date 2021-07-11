'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entreprises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomE: {
        allowNull: false,
        type: Sequelize.STRING
      },
      typeE: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nbrAssocies: {
        allowNull: false,
        type: Sequelize.STRING
      },
      listWithNomAndPathCin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      listGerant: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sectActi: {
        allowNull: false,
        type: Sequelize.STRING
      },
      capital: {
        allowNull: false,
        type: Sequelize.STRING
      },
      validationComptable: {
        allowNull: false,
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
    await queryInterface.dropTable('Entreprises');
  }
};