import { Admin } from '@/models'
import { AdminResponse } from '@/interfaces/admin'
import { AdminNotFoundError, AdminExistError } from '@/errors'
import randomstring from 'randomstring'
import { encryptPassword } from '@/utils'

async function getAdminByUsername(username: string, needExist = true): Promise<Admin> {
  const admin = await Admin.findOne({ where: { username } })
  if (needExist && !admin) {
    throw new AdminNotFoundError(username)
  } else if (!needExist && admin) {
    throw new AdminExistError(username)
  }
  return admin
}

export default {
  async createAdmin(username: string, password: string): Promise<AdminResponse> {
    await getAdminByUsername(username, false)
    const passwordSalt = randomstring.generate(32)
    const admin = await Admin.create({
      username,
      password: encryptPassword(password, passwordSalt),
      passwordSalt,
    })
    return admin.getResponse()
  },
}
