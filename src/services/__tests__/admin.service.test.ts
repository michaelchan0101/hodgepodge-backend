import adminService from '../admin.service'
import { AdminExistError } from '@/errors'

describe('AdminService', () => {
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
