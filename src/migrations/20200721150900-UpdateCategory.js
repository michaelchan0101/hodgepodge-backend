'use strict'
const { DataTypes } = require('sequelize')

const TABLE_NAME = 'categories'

module.exports = {
  up: async queryInterface => {
    await queryInterface.addColumn(TABLE_NAME, 'is_show_in_menu', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    })
    await queryInterface.addColumn(TABLE_NAME, 'sort', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })
  },
  down: async queryInterface => {
    await queryInterface.removeColumn(TABLE_NAME, 'is_show_in_menu')
    await queryInterface.removeColumn(TABLE_NAME, 'sort')
  },
}
