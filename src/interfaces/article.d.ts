import { CategoryResponse } from './category'

export interface ImportArticleRequest {
  categoryId: number
  title: string
  path: string
}

export interface CreateOrUpdateArticleRequest {
  categoryId: number
  title: string
  content: string
}

export interface ArticleResponse {
  id: number
  categoryId: number
  title: string
  content?: string
  originalContent?: string
  category?: CategoryResponse
  createdAt: string
  updatedAt: string
}

export interface ListArticlesFilter {
  categoryId?: number
}

export interface ListArticlesResponse {
  articles: Array<ArticleResponse>
  limit: number
  offset: number
}
