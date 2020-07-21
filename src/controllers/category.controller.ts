import { Context } from 'interfaces/http'
import { string2number } from '@/utils'
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
  async adminUpdateCategory(ctx: Context) {
    const { name, isShowInMenu, sort } = ctx.request.body
    ctx.body = await categoryService.adminUpdateCategory(string2number(ctx.params.id), {
      name,
      isShowInMenu,
      sort,
    })
  },
}
