import { Article } from '@/models'
import {
  ImportArticleRequest,
  CreateOrUpdateArticleRequest,
  ArticleResponse,
  ListArticlesResponse,
  ListArticlesFilter,
} from 'interfaces/article'
import fs from 'fs'
import { Op } from 'sequelize'
import marked from 'marked'
import { ArticleNotFoundError } from '@/errors'

// const converter = new Converter({
//   tasklists: true,
//   tables: true,
//   underline: true,
//   parseImgDimensions: true,
//   strikethrough: true,
// })

async function md2html(path: string): Promise<string> {
  const md = await fs.promises.readFile(path)
  return marked(md.toString())
}

async function createArticle(req: CreateOrUpdateArticleRequest): Promise<Article> {
  const article = await Article.create({ ...req, createdAt: req.updatedAt })
  article.set({ updatedAt: req.updatedAt }, { raw: true })
  await article.save({ silent: true, fields: ['updatedAt'] })
  return article
}

async function updateArticle(
  article: Article,
  req: CreateOrUpdateArticleRequest
): Promise<Article> {
  // article.set(req, { raw: true })
  // await article.save({ silent: true, fields: Object.keys(req) })
  await article.update(req)
  return article
}

async function getFileUpdatedAt(path: string): Promise<Date> {
  const stats = await fs.promises.stat(path)
  return stats.mtime
}

export default {
  async batchImportArticles(
    files: Array<ImportArticleRequest>
  ): Promise<Array<ArticleResponse>> {
    const articles = await Article.findAll({
      where: { title: { [Op.in]: files.map(file => file.title) } },
    })
    const articleObj: { [title: string]: Article } = {}
    articles.forEach(article => {
      articleObj[article.title] = article
    })
    const nArticles: Array<ArticleResponse> = []
    for await (const file of files) {
      const { path, title, categoryId } = file
      const updatedAt = await getFileUpdatedAt(path)
      if (
        articleObj[title] &&
        updatedAt.getTime() <= articleObj[title].createdAt.getTime()
      ) {
        continue
      }

      const content = await md2html(file.path)
      const articleReq: CreateOrUpdateArticleRequest = {
        content,
        title,
        categoryId,
        updatedAt,
      }

      let article: Article
      if (!articleObj[title]) {
        article = await createArticle(articleReq)
      } else {
        article = await updateArticle(articleObj[title], articleReq)
      }
      nArticles.push(article.getResponse())
    }
    return nArticles
  },
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
