import { RouteOptions } from 'interfaces/http'
import Joi from '@hapi/joi'
import articleController from 'controllers/article.controller'
import categoryController from 'controllers/category.controller'
import configController from 'controllers/config.controller'

const routes: Array<RouteOptions> = [
  {
    path: '/articles',
    get: {
      title: '文章列表',
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
    path: '/articles/:id(\\d+)',
    get: {
      title: '文章详情',
      handle: articleController.getArticle,
    },
  },
  {
    path: '/categories',
    get: {
      title: '分类列表',
      handle: categoryController.listCategories,
    },
  },
  {
    path: '/config',
    get: {
      title: '网站配置',
      handle: configController.getConfig,
    },
  },
]

export default {
  version: 'v1.0',
  routes,
}
