import jwt from 'jsonwebtoken'
import config from '@/config'
import debugJwtVerifier from '../debugJwtVerifier'
import { JwtVerificationError } from '@/errors'

const { debugSecret: SECRET } = config.jwt

describe('debugJwtVerifier', () => {
  const mockPayload1 = {
    id: 1001,
    username: 'debug',
  }
  const mockNext: any = jest.fn(err => err)
  // const mockRes: any = {
  //   get: jest.fn(),
  //   set: jest.fn(),
  // }
  test('should successfully', async () => {
    const mockCtx: any = {
      auth: {
        token: jwt.sign(mockPayload1, SECRET, {
          algorithm: 'HS256',
          expiresIn: '2s',
        }),
      },
    }
    await debugJwtVerifier(mockCtx, mockNext)

    expect(mockCtx.user.id).toEqual(mockPayload1.id)
    expect(mockCtx.user.username).toEqual(mockPayload1.username)
  })

  test('should failure', async () => {
    const mockCtx: any = {
      auth: {
        token: jwt.sign({}, '1', {
          algorithm: 'HS256',
          expiresIn: '2s',
        }),
      },
    }
    expect(() => debugJwtVerifier(mockCtx, mockNext)).toThrowError(JwtVerificationError)
  })
})
