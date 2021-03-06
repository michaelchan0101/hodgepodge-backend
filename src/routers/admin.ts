import { RouteOptions } from 'interfaces/http'
import Joi from '@hapi/joi'
import adminController from 'controllers/admin.controller'
import articleController from 'controllers/article.controller'
import categoryController from 'controllers/category.controller'
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
    get: {
      title: '管理员列表',
      schema: AUTH_SCHEMA.ADMIN,
      handle: adminController.listAdmins,
    },
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
    path: 'admins/:id(\\d+)',
    delete: {
      title: '删除管理员',
      schema: AUTH_SCHEMA.ADMIN,
      handle: adminController.deleteAdmin,
    },
  },
  {
    path: 'admins/:id(\\d+)/password',
    patch: {
      title: '修改管理员密码',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        body: {
          password: Joi.string().min(6),
        },
      },
      handle: adminController.updateAdminPassword,
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
  {
    path: 'articles/:id(\\d+)',
    get: {
      title: '文章详情',
      schema: AUTH_SCHEMA.ADMIN,
      handle: articleController.adminGetArticle,
    },
    patch: {
      title: '修改文章',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        body: {
          title: Joi.string().min(1).required(),
          categoryId: Joi.number().min(1).required(),
          content: Joi.string().required(),
        },
      },
      handle: articleController.adminUpdateArticle,
    },
    delete: {
      title: '删除文章',
      schema: AUTH_SCHEMA.ADMIN,
      handle: articleController.adminDeleteArticle,
    },
  },
  {
    path: 'categories',
    get: {
      title: '分类列表',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        query: {
          limit: Joi.number().empty(),
          offset: Joi.number().empty(),
          categoryId: Joi.number().empty(),
        },
      },
      handle: categoryController.adminListCategories,
    },
    post: {
      title: '添加分类',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        body: {
          name: Joi.string().min(1).required(),
          isShowInMenu: Joi.boolean().required(),
          sort: Joi.number().required(),
        },
      },
      handle: categoryController.adminCreateCategory,
    },
  },
  {
    path: 'categories/:id(\\d+)',
    patch: {
      title: '修改分类',
      schema: AUTH_SCHEMA.ADMIN,
      params: {
        body: {
          name: Joi.string().min(1).required(),
          isShowInMenu: Joi.boolean().required(),
          sort: Joi.number().required(),
        },
      },
      handle: categoryController.adminUpdateCategory,
    },
    delete: {
      title: '删除分类',
      schema: AUTH_SCHEMA.ADMIN,
      handle: categoryController.adminDeleteCategory,
    },
  },
]

export default {
  version: 'v1.0',
  type: 'admin',
  routes,
}
