import adminService from '../admin.service'
import { AdminExistError, AdminUsernameOrPasswordError } from '@/errors'
import fixtures from 'tests/fixtures'
import { Admin } from '@/models'

describe('AdminService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })

  test('should list admins successfully', async () => {
    const results = await adminService.listAdmins()
    expect(results.admins).toHaveLength(2)
    expect(results.admins[0].id).toEqual(2)
    expect(results.admins[1].id).toEqual(1)
  })

  describe('Login Admin', () => {
    const username = 'user1'
    test('should successfully', async () => {
      const { admin, token } = await adminService.loginAdmin(username, '123456')
      expect(admin.id).toEqual(1)
      expect(admin.username).toEqual(username)
      expect(token).not.toBeUndefined()
    })

    test('should failure', async () => {
      await expect(adminService.loginAdmin(username, '1234567')).rejects.toThrowError(
        AdminUsernameOrPasswordError
      )
    })
  })

  describe('Create Admin', () => {
    test('create admin success', async () => {
      const username = 'user_1001'
      const password = '123456'

      const admin = await adminService.createAdmin(username, password)
      expect(admin.username).toEqual(username)
    })

    test('create admin failed/AdminExistError', async () => {
      const username = 'user_1001'
      const password = '123456'
      await expect(adminService.createAdmin(username, password)).rejects.toThrowError(
        AdminExistError
      )
    })
  })

  test('should update admin password successfully', async () => {
    const password = '1234567'

    const admin = await adminService.updateAdminPassword(1, password)
    expect(admin.id).toEqual(1)
  })

  test('should delete admin successfully', async () => {
    await adminService.deleteAdmin(1)
    const admin = await Admin.findByPk(1)
    expect(admin).toBeNull()
  })
})
