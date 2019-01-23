'use strict';

module.exports = (sequelize, DataTypes) => {
  const Recipe_download = sequelize.define(
    'Recipe_download',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      recipe: {
        type: DataTypes.JSON,
      },
    },
    {
      underscored: true,
    },
  );

  Recipe_download.associate = models => {
    Recipe_download.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    Recipe_download.belongsToMany(models.Plan, {
      through: {
        model: 'Plan_recipe',
        unique: false,
      },
      onDelete: 'CASCADE',
    });
    Recipe_download.belongsToMany(models.Ingredient, {
      through: 'Recipe_ingredient',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'recipe_id',
      },
    });
  };

  return Recipe_download;
};
