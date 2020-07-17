import { Context, Next } from 'interfaces/http'
import { InvalidAuthHeaderError } from 'errors'
import AUTH_SCHEMA from 'enums/apiSchema'
import adminJwtVerifier from './adminJwtVerifier'

export default (schema: string) => (ctx: Context, next: Next) => {
  if (schema === AUTH_SCHEMA.PUBLIC) {
    return next()
  }
  const authHeader = ctx.request.headers['authorization']
  if (!authHeader) {
    throw new InvalidAuthHeaderError('Missing Authorization header')
  }
  const schemaAndToken = authHeader.split(' ')
  if (schemaAndToken.length !== 2) {
    throw new InvalidAuthHeaderError('Invalid auth header format')
  }
  const [tokenSchema, token] = schemaAndToken
  if (!/^Bearer$/i.test(tokenSchema)) {
    throw new InvalidAuthHeaderError('Authorization only accept Bearer schema')
  }
  ctx.auth = { token }

  let reqSchema = ctx.request.headers['auth-schema']
  if (!reqSchema) {
    throw new InvalidAuthHeaderError('Missing Auth-Schema header')
  }
  reqSchema = reqSchema.trim().toUpperCase()
  if (reqSchema === AUTH_SCHEMA.ADMIN && reqSchema === schema) {
    return adminJwtVerifier(ctx, next)
  }
  throw new InvalidAuthHeaderError('Schema mismatch!')
}
