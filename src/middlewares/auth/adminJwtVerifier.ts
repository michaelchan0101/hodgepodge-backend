import _ from 'lodash'
import config from '@/config'
import { InvalidAuthHeaderError, JwtVerificationError } from '@/errors'
import jwt, { VerifyOptions } from 'jsonwebtoken'
import { Context, Next } from 'interfaces/http'

const { adminSecret: SECRET } = config
const jwtOptions: VerifyOptions = {
  algorithms: ['HS256'],
}
function jwtVerify(jwtToken: string): any {
  try {
    return jwt.verify(jwtToken, SECRET, jwtOptions)
  } catch (error) {
    throw new JwtVerificationError(error)
  }
}

export default (ctx: Context, next: Next) => {
  const jwtToken = ctx.auth ? ctx.auth.token : null

  if (!jwtToken) {
    throw new InvalidAuthHeaderError('Missing jwt token')
  }
  const payload = jwtVerify(jwtToken)
  ctx.admin = payload
  return next()
}
