'use strict'
const { DataTypes } = require('sequelize')

const TABLE_NAME = 'categories'

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          field: 'deleted_at',
        },
        version: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    )
  },
  down: async queryInterface => {
    await queryInterface.dropTable(TABLE_NAME)
  },
}
