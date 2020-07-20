import moment from 'moment'
import jwt from 'jsonwebtoken'
import { Admin } from '@/models'
import config from '@/config'
import { AdminResponse, AdminLoginResponse } from '@/interfaces/admin'

const { adminSecret: SECRET } = config.jwt

function genToken(payload: Record<string, unknown>): string {
  const token = jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '12h',
  })
  return `Bearer ${token}`
}

export function getAdminResponse(admin: Admin): AdminResponse {
  return {
    id: admin.id,
    username: admin.username,
    createdAt: moment(admin.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(admin.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  }
}

export function getAdminLoginResponse(admin: Admin): AdminLoginResponse {
  const response = getAdminResponse(admin)
  return {
    admin: response,
    token: genToken({ id: response.id, username: response.username }),
  }
}
