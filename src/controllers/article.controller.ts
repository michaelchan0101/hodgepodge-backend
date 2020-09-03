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
  async adminListArticles(ctx: Context) {
    const { categoryId, limit, offset } = ctx.request.query
    ctx.body = await articleService.listArticles(
      { categoryId: string2number(categoryId) },
      string2number(limit),
      string2number(offset)
    )
  },
  async adminGetArticle(ctx: Context) {
    ctx.body = await articleService.adminGetArticle(string2number(ctx.params.id))
  },
  async adminCreateArticle(ctx: Context) {
    const { title, categoryId, content } = ctx.request.body
    ctx.body = await articleService.adminCreateArticle({ title, categoryId, content })
  },
  async adminUpdateArticle(ctx: Context) {
    const { title, categoryId, content } = ctx.request.body
    ctx.body = await articleService.adminUpdateArticle(string2number(ctx.params.id), {
      title,
      categoryId,
      content,
    })
  },
}
