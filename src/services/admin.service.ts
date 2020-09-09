import { Admin } from '@/models'
import { AdminResponse, AdminLoginResponse } from '@/interfaces/admin'
import { AdminNotFoundError, AdminExistError } from '@/errors'
import { encryptPassword } from '@/utils'
import adminValidator from 'validators/admin.validator'

import randomstring from 'randomstring'
import { getAdminLoginResponse, getAdminResponse } from '@/transformers/admin.transformer'

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
    return getAdminResponse(admin)
  },
  async loginAdmin(username: string, password: string): Promise<AdminLoginResponse> {
    const admin = await Admin.findOne({ where: { username } })
    adminValidator(admin).exists().password(password)
    await admin.update({ token: randomstring.generate(32) })
    return getAdminLoginResponse(admin)
  },
  async deleteAdmin(id: number): Promise<void> {
    const admin = await Admin.findByPk(id)
    adminValidator(admin).exists()
    await admin.destroy()
  },
  async updateAdminPassword(id: number, password: string): Promise<AdminResponse> {
    const admin = await Admin.findByPk(id)
    adminValidator(admin).exists()
    const passwordSalt = randomstring.generate(32)
    await admin.update({
      password: encryptPassword(password, passwordSalt),
      passwordSalt,
    })
    return getAdminResponse(admin)
  },
}
