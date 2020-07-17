import { RouteOptions } from 'interfaces/http'
import Joi from '@hapi/joi'
import adminController from 'controllers/admin.controller'
import { AUTH_SCHEMA } from 'enums/apiSchema'

const routes: Array<RouteOptions> = [
  {
    path: 'login',
    post: {
      title: '登陆',
      schema: AUTH_SCHEMA.PUBLIC,
      params: {
        body: {
          username: Joi.string().min(1),
          password: Joi.string().min(6),
        },
      },
      handle: adminController.loginAdmin,
    },
  },
  {
    path: 'admins',
    post: {
      title: '创建管理员',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        body: {
          username: Joi.string().min(1),
          password: Joi.string().min(6),
        },
      },
      handle: adminController.createAdmin,
    },
  },
]

export default {
  version: 'v1.0',
  type: 'admin',
  routes,
}
