import { RouteOptions } from 'interfaces/http'
import Joi from '@hapi/joi'
import articleController from 'controllers/article.controller'
import categoryController from 'controllers/category.controller'
import { AUTH_SCHEMA } from 'enums/apiSchema'

const routes: Array<RouteOptions> = [
  {
    path: 'articles',
    get: {
      title: '文章列表',
      schema: AUTH_SCHEMA.PUBLIC,
      params: {
        query: {
          categoryId: Joi.number().empty(),
          limit: Joi.number().empty(),
          offset: Joi.number().empty(),
        },
      },
      handle: articleController.listArticles,
    },
  },
  {
    path: 'articles/:id(\\d+)',
    get: {
      title: '文章详情',
      schema: AUTH_SCHEMA.PUBLIC,
      handle: articleController.getArticle,
    },
  },
  {
    path: 'categories',
    get: {
      title: '分类列表',
      schema: AUTH_SCHEMA.PUBLIC,
      handle: categoryController.listCategories,
    },
  },
]

export default {
  version: 'v1.0',
  type: 'client',
  routes,
}
