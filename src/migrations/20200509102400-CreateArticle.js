'use strict'
const { DataTypes } = require('sequelize')

const TABLE_NAME = 'articles'

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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          field: 'category_id',
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
        engine: 'MyISAM',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    )
    await queryInterface.addIndex(TABLE_NAME, ['title', 'content'], {
      name: 'article_index_title_content',
      type: 'FULLTEXT',
    })
  },
  down: async queryInterface => {
    await queryInterface.removeIndex(TABLE_NAME, 'article_index_title_content')
    await queryInterface.dropTable(TABLE_NAME)
  },
}
