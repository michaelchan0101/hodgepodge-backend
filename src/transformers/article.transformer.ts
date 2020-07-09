import { Article } from '@/models'
import { ArticleResponse } from 'interfaces/article'
import moment from 'moment'

export function getArticleResponse(article: Article): ArticleResponse {
  return {
    id: article.id,
    categoryId: article.categoryId,
    title: article.title,
    content: article.content,
    category: article.Category?.response,
    createdAt: moment(article.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(article.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  }
}
