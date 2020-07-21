'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'
import { getAdminResponse } from 'transformers/admin.transformer'
import { AdminResponse } from '@/interfaces/admin'

const scheme = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordSalt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

export class Admin extends Model {
  public id!: number
  public username!: string
  public password!: string
  public passwordSalt!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public getResponse(): AdminResponse {
    return getAdminResponse(this)
  }

  public get response(): AdminResponse {
    return this.getResponse()
  }
}

export function initAdmin(sequelize: Sequelize) {
  Admin.init(scheme, { sequelize, tableName: 'admins' })
}
