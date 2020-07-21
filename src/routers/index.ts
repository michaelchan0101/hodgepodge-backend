import Router from 'koa-router'
import apiParamVerifier from 'middlewares/apiParamVerifier'
import client from './client'
import admin from './admin'
import AUTH_SCHEMA from '@/enums/apiSchema'
import authRouter from 'middlewares/auth'

const METHODS = ['get', 'post', 'delete', 'patch', 'put']
function getRouter(schema?: string): Router {
  const router = new Router()
  if (schema) {
    router.use(authRouter(schema))
  }
  return router
}

export function getRouters() {
  const routers = {
    [AUTH_SCHEMA.PUBLIC]: getRouter(),
    [AUTH_SCHEMA.ADMIN]: getRouter(AUTH_SCHEMA.ADMIN),
  }
  ;[admin, client].forEach(({ routes, type, version }) =>
    routes.forEach(route => {
      METHODS.forEach(method => {
        if (!route[method]) {
          return
        }
        const { handle, handles = [], params, schema } = route[method]
        if (params) {
          handles.push(apiParamVerifier(params))
        }
        routers[schema][method](
          `/api/${type}/${version}/${route.path}`,
          ...handles,
          handle
        )
      })
    })
  )

  return Object.values(routers).map(router => router.routes())
}
