'use strict'
import jwt, { VerifyOptions } from 'jsonwebtoken'
import _ from 'lodash'
import config from '@/config'
import { JwtVerificationError, InvalidAuthHeaderError } from '@/errors'
import { Context, Next } from 'interfaces/http'

const { debugSecret: SECRET } = config.jwt

function jwtVerify(jwtToken: string) {
  const jwtOptions: VerifyOptions = {
    algorithms: ['HS256'],
  }
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

  const payload: any = jwtVerify(jwtToken)
  // trust the payload here
  ctx.user = payload
  return next()
}
