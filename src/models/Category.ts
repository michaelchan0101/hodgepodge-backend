'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'
import { Article } from './Article'
import { CategoryResponse } from 'interfaces/category'
import { getCategoryResponse } from 'transformers/category.transformer'

const scheme = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

export class Category extends Model {
  public id!: number
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public getResponse(): CategoryResponse {
    return getCategoryResponse(this)
  }
  public get response(): CategoryResponse {
    return this.getResponse()
  }
}

export function initCategory(sequelize: Sequelize) {
  Category.init(scheme, { sequelize, tableName: 'categories' })
}

export function associateCategory() {
  Category.hasMany(Article, { foreignKey: 'categoryId' })
}
