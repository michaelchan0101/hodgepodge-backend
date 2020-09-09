import { Context } from 'interfaces/http'
import adminService from 'services/admin.service'
import { string2number } from '@/utils'

export default {
  async loginAdmin(ctx: Context) {
    const { username, password } = ctx.request.body
    ctx.body = await adminService.loginAdmin(username, password)
  },
  async createAdmin(ctx: Context) {
    const { username, password } = ctx.request.body
    ctx.body = await adminService.createAdmin(username, password)
  },
  async deleteAdmin(ctx: Context) {
    await adminService.deleteAdmin(string2number(ctx.params.id))
    ctx.body = {}
  },
}
