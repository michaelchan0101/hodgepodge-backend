import Koa from 'koa'

export interface Context extends Koa.Context {
  user?: any
  auth?: any
}

export type Next = Koa.Next

type Handle = (ctx: Context, next: Next) => void

export interface RouteMethod {
  title?: string
  params?: {
    body?: Record<string, any>
    query?: Record<string, any>
  }
  response?: any
  handle?: Handle
  handles?: Array<Handle>
}

export interface RouteOptions {
  path: string | RegExp
  get?: RouteMethod
  post?: RouteMethod
  delete?: RouteMethod
  patch?: RouteMethod
  put?: RouteMethod
}
