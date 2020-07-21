'use strict'
const { DataTypes } = require('sequelize')

const TABLE_NAME = 'articles'

module.exports = {
  up: async queryInterface => {
    await queryInterface.addColumn(TABLE_NAME, 'original_content', {
      type: DataTypes.TEXT,
      allowNull: false,
    })
  },
  down: async queryInterface => {
    await queryInterface.removeColumn(TABLE_NAME, 'original_content')
  },
}
