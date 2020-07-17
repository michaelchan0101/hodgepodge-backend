import moment from 'moment'
import jwt from 'jsonwebtoken'
import { Admin } from '@/models'
import config from '@/config'
import { AdminResponse, AdminLoginResponse } from '@/interfaces/admin'

function genToken(payload: Record<string, unknown>): string {
  const token = jwt.sign(payload, config.adminSecret, {
    algorithm: 'HS256',
    expiresIn: '30d',
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
