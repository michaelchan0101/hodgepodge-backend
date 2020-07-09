import { Context } from 'interfaces/http'
import { string2number } from '@/utils'
import articleService from 'services/article.service'

export default {
  async listArticles(ctx: Context) {
    const { categoryId, limit, offset } = ctx.request.query
    ctx.body = await articleService.listArticles(
      { categoryId: string2number(categoryId) },
      string2number(limit),
      string2number(offset)
    )
  },
  async getArticle(ctx: Context) {
    ctx.body = await articleService.getArticle(string2number(ctx.params.id))
  },
}
