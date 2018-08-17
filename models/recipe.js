'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(511),
      unique: true
    },
    intructions: {
      type: DataTypes.STRING(1023)
    },
    serves: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    photo: {
      type: DataTypes.STRING(511),
    }
  }, {
    underscored: true
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      onDelete: 'CASCADE',
      allowNull: false
    });
    Recipe.belongsToMany(models.Plan, {
      through: 'Plan_recipe',
      onDelete: 'CASCADE',
      defaultValue: null
    });
    Recipe.belongsToMany(models.Ingredient, {
      through: 'Recipe_ingredient',
      onDelete: 'CASCADE',
      allowNull: false
    });
  };

  return Recipe;
};