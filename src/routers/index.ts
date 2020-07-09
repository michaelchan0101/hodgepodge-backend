import Router from 'koa-router'
import apiParamVerifier from 'middlewares/apiParamVerifier'
import V10 from './v1.0'

const METHODS = ['get', 'post', 'delete', 'patch', 'put']
export function getRouters() {
  const router = new Router({ prefix: '/api' })
  V10.routes.forEach(route => {
    METHODS.forEach(method => {
      if (!route[method]) {
        return
      }
      const { handle, handles = [], params } = route[method]
      if (params) {
        handles.push(apiParamVerifier(params))
      }
      if (handle) {
        handles.push(handle)
      }
      router[method](`/${V10.version}${route.path}`, ...handles)
    })
  })

  return router.routes()
}
