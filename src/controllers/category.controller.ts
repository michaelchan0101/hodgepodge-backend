import { Context } from 'interfaces/http'
import categoryService from 'services/category.service'

export default {
  async listCategories(ctx: Context) {
    ctx.body = await categoryService.listCategories()
  },
  async adminListCategories(ctx: Context) {
    ctx.body = await categoryService.adminListCategories()
  },
  async adminCreateCategory(ctx: Context) {
    const { name, isShowInMenu, sort } = ctx.request.body
    ctx.body = await categoryService.adminCreateCategory({ name, isShowInMenu, sort })
  },
}
