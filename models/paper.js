'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      paper.belongsToMany(models.Entreprise, {through: models.PaperAdvancement})

    }
  };
  paper.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'paper',
  });
  return paper;
};