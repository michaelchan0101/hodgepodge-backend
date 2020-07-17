import { Context } from 'interfaces/http'
import adminService from 'services/admin.service'

export default {
  async loginAdmin(ctx: Context) {
    const { username, password } = ctx.request.body
    ctx.body = await adminService.loginAdmin(username, password)
  },
  async createAdmin(ctx: Context) {
    const { username, password } = ctx.request.body
    ctx.body = await adminService.createAdmin(username, password)
  },
}
