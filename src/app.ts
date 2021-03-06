import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import { getRouters } from './routers'
import { generalErrorHandler } from 'middlewares/errorHandler'
import { ResourceNotFoundError } from '@/errors'
import config from '@/config'

export async function createApiServer(): Promise<Koa> {
  const app = new Koa()
  app.use(
    koaLogger((str, args) => {
      if (!config.isTest) {
        console.log(str)
      }
    })
  )
  app.use(
    bodyParser({
      enableTypes: ['json', 'form'],
    })
  )
  app.use((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', config.cors.origin)
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS')
    if (ctx.request.method === 'OPTIONS') {
      ctx.status = 200
    } else {
      return next()
    }
  })
  app.use(generalErrorHandler)
  getRouters().forEach(routeFunc => app.use(routeFunc))
  app.use(ctx => {
    throw new ResourceNotFoundError(ctx.request)
  })
  return app
}
