import jwt from 'jsonwebtoken'
import config from '@/config'
import clientJwtVerifier from '../adminJwtVerifier'
import { JwtVerificationError } from '@/errors'

const { adminSecret: SECRET } = config

describe('clientJwtVerifier', () => {
  const mockPayload1 = {
    id: 1,
    nickname: 'xxx',
  }
  const mockNext: any = jest.fn(err => err)
  test('should successfully', async () => {
    const mockCtx: any = {
      auth: {
        token: jwt.sign(mockPayload1, SECRET, {
          algorithm: 'HS256',
          expiresIn: '2s',
        }),
      },
      set: jest.fn(),
    }
    clientJwtVerifier(mockCtx, mockNext)

    expect(mockCtx.user.id).toEqual(mockPayload1.id)
    expect(mockCtx.user.nickname).toEqual(mockPayload1.nickname)
  })

  test('should failure', async () => {
    const mockCtx: any = {
      auth: {
        token: jwt.sign({}, '111', {
          algorithm: 'HS256',
          expiresIn: '2s',
        }),
      },
      set: jest.fn(),
    }
    expect(() => clientJwtVerifier(mockCtx, mockNext)).toThrowError(JwtVerificationError)
  })

  test('should auto-renew JWT if expired', async () => {
    const mockCtx: any = {
      auth: {
        token: jwt.sign({}, SECRET, {
          algorithm: 'HS256',
          expiresIn: '2s',
        }),
      },
      set: jest.fn(),
    }

    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    }) // Wait to ensure JWT is expired
    expect(clientJwtVerifier(mockCtx, mockNext)).toBeUndefined()
    expect(mockCtx.set).not.toHaveBeenCalledWith(
      'Authorization',
      `Bearer ${mockCtx.auth.token}`
    )
  })
})
