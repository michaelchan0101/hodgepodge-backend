import _ from 'lodash'
import config from '@/config'
import { InvalidAuthHeaderError, JwtVerificationError } from '@/errors'
import jwt, { VerifyOptions } from 'jsonwebtoken'
import { Context, Next } from 'interfaces/http'

const { adminSecret: SECRET } = config.jwt

const jwtOptions: VerifyOptions = {
  algorithms: ['HS256'],
}

const MAX_AGE = 12 * 3600

function jwtVerify(jwtToken: string): any {
  try {
    const { iat, exp }: any = jwt.decode(jwtToken)
    if (!iat || !exp) {
      throw new Error('jwt token error')
    }
    if (exp <= iat || exp - iat > MAX_AGE) {
      throw new Error(`expire time is longer than 'iat' + ${MAX_AGE}`)
    }
    return jwt.verify(jwtToken, SECRET, jwtOptions)
  } catch (error) {
    throw new JwtVerificationError(error)
  }
}

function shouldRenewJwt(payload: any) {
  return (
    Math.floor(Date.now() / 1000) >=
    Math.floor((payload.exp - payload.iat) / 2) + payload.iat
  )
}

export default (ctx: Context, next: Next) => {
  const jwtToken = ctx.auth ? ctx.auth.token : null

  if (!jwtToken) {
    throw new InvalidAuthHeaderError('Missing jwt token')
  }
  const payload = jwtVerify(jwtToken)
  let newJwt = jwtToken
  if (shouldRenewJwt(payload)) {
    newJwt = jwt.sign(_.omit(payload, ['iat', 'exp', 'iss']), SECRET, {
      algorithm: 'HS256',
      expiresIn: '12h',
    })
  }
  ctx.set('Authorization', `Bearer ${newJwt}`)
  ctx.user = payload
  return next()
}
