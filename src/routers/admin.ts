import { RouteOptions } from 'interfaces/http'
import Joi from '@hapi/joi'
import adminController from 'controllers/admin.controller'
import articleController from 'controllers/article.controller'
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
  {
    path: 'articles',
    get: {
      title: '文章列表',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        query: {
          limit: Joi.number().empty(),
          offset: Joi.number().empty(),
          categoryId: Joi.number().empty(),
        },
      },
      handle: articleController.adminListArticles,
    },
    post: {
      title: '添加文章',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        body: {
          title: Joi.string().min(1).required(),
          categoryId: Joi.number().min(1).required(),
          content: Joi.string().required(),
        },
      },
      handle: articleController.adminCreateArticle,
    },
  },
]

export default {
  version: 'v1.0',
  type: 'admin',
  routes,
}
