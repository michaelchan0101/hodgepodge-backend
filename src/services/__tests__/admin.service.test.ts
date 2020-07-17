import adminService from '../admin.service'
import { AdminExistError, AdminUsernameOrPasswordError } from '@/errors'

describe('AdminService', () => {
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
})
