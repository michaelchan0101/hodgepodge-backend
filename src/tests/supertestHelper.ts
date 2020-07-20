import request from 'supertest'
import jwt from 'jsonwebtoken'
import config from '@/config'
export const injectHeader = (payload: any) => {
  const { debugSecret: secret } = config.jwt
  const jwtDebug = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '14d',
  })
  return {
    schema: 'DEBUG',
    token: `Bearer ${jwtDebug}`,
  }
}

export default request
