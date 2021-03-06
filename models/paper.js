'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paper.belongsToMany(models.Entreprise, {through: models.PaperAdvancement})
      Paper.hasMany(models.PaperAdvancement,{foreignKey: 'PaperId'})
    }
  };
  Paper.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paper',
  });
  return Paper;
};