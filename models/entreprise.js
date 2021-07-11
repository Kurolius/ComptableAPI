'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entreprise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Entreprise.belongsTo(models.Client)
      Entreprise.belongsToMany(models.paper, {through: models.PaperAdvancement})
    }
  };
  Entreprise.init({
    nomE: DataTypes.STRING,
    typeE: DataTypes.STRING,
    nbrAssocies: DataTypes.STRING,
    listWithNomAndPathCin: DataTypes.STRING,
    listGerant: DataTypes.STRING,
    sectActi: DataTypes.STRING,
    capital: DataTypes.STRING,
    validationComptable: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entreprise',
  });
  return Entreprise;
};