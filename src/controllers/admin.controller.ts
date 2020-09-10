import { Context } from 'interfaces/http'
import adminService from 'services/admin.service'
import { string2number } from '@/utils'

export default {
  async loginAdmin(ctx: Context) {
    const { username, password } = ctx.request.body
    ctx.body = await adminService.loginAdmin(username, password)
  },
  async listAdmins(ctx: Context) {
    ctx.body = await adminService.listAdmins()
  },
  async createAdmin(ctx: Context) {
    const { username, password } = ctx.request.body
    ctx.body = await adminService.createAdmin(username, password)
  },
  async deleteAdmin(ctx: Context) {
    await adminService.deleteAdmin(string2number(ctx.params.id))
    ctx.body = {}
  },
  async updateAdminPassword(ctx: Context) {
    const { password } = ctx.request.body
    ctx.body = await adminService.updateAdminPassword(
      string2number(ctx.params.id),
      password
    )
  },
}
