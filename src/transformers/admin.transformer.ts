import { Admin } from '@/models'
import moment from 'moment'
import { AdminResponse } from '@/interfaces/admin'

export function getAdminResponse(admin: Admin): AdminResponse {
  return {
    id: admin.id,
    username: admin.username,
    createdAt: moment(admin.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(admin.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  }
}
