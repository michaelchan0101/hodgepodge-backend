import { Article } from '@/models'
import {
  ArticleResponse,
  ListArticlesResponse,
  ListArticlesFilter,
} from 'interfaces/article'
import { ArticleNotFoundError } from '@/errors'

export default {
  async listArticles(
    filters: ListArticlesFilter = {},
    limit = 20,
    offset = 0
  ): Promise<ListArticlesResponse> {
    const where: Record<string, any> = {}
    if (filters.categoryId) {
      where.categoryId = filters.categoryId
    }
    const articles = await Article.scope('withCategory').findAll({
      where,
      limit,
      offset,
      order: [['id', 'DESC']],
    })
    return {
      articles: articles.map((article: Article) => article.getResponse()),
      limit,
      offset,
    }
  },
  async getArticle(id: number): Promise<ArticleResponse> {
    const article = await Article.scope('withCategory').findByPk(id)
    if (!article) {
      throw new ArticleNotFoundError(id)
    }
    return article.getResponse()
  },
}
