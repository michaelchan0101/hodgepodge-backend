import { Article } from '@/models'
import {
  ArticleResponse,
  ListArticlesResponse,
  ListArticlesFilter,
  CreateOrUpdateArticleRequest,
} from 'interfaces/article'
import { ArticleNotFoundError } from '@/errors'
import marked from 'marked'

async function getArticleById(id: number): Promise<Article> {
  const article = await Article.scope('withCategory').findByPk(id, {
    attributes: { exclude: ['originalContent'] },
  })
  if (!article) {
    throw new ArticleNotFoundError(id)
  }
  return article
}

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
      attributes: { exclude: ['content', 'originalContent'] },
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
    const article = await Article.scope('withCategory').findByPk(id, {
      attributes: { exclude: ['originalContent'] },
    })
    if (!article) {
      throw new ArticleNotFoundError(id)
    }
    return article.getResponse()
  },
  async adminGetArticle(id: number): Promise<ArticleResponse> {
    const article = await Article.scope('withCategory').findByPk(id, {
      attributes: { exclude: ['content'] },
    })
    if (!article) {
      throw new ArticleNotFoundError(id)
    }
    return article.getResponse()
  },
  async adminCreateArticle(req: CreateOrUpdateArticleRequest): Promise<ArticleResponse> {
    const article = await Article.scope('withCategory').create({
      categoryId: req.categoryId,
      title: req.title,
      originalContent: req.content,
      content: marked(req.content),
    })
    return article.getResponse()
  },
  async adminUpdateArticle(
    id: number,
    req: CreateOrUpdateArticleRequest
  ): Promise<ArticleResponse> {
    const article = await getArticleById(id)
    await article.update({
      categoryId: req.categoryId,
      title: req.title,
      originalContent: req.content,
      content: marked(req.content),
    })
    return article.getResponse()
  },
}
