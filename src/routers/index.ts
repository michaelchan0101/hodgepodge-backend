import Router from 'koa-router'
import apiParamVerifier from 'middlewares/apiParamVerifier'
import client from './client'
import admin from './admin'

const METHODS = ['get', 'post', 'delete', 'patch', 'put']
export function getRouters() {
  const router = new Router({ prefix: '/api' })
  ;[admin, client].forEach(({ routes, type, version }) =>
    routes.forEach(route => {
      METHODS.forEach(method => {
        if (!route[method]) {
          return
        }
        const { handle, handles = [], params } = route[method]
        if (params) {
          handles.push(apiParamVerifier(params))
        }
        router[method](`/${type}/${version}/${route.path}`, ...handles, handle)
      })
    })
  )

  return router.routes()
}
