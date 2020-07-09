import { Context } from 'interfaces/http'
import categoryService from 'services/category.service'

export default {
  async listCategories(ctx: Context) {
    ctx.body = await categoryService.listCategories()
  },
}
