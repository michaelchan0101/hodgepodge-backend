import { Category } from '@/models'
import { CategoryResponse } from 'interfaces/category'
import moment from 'moment'

export function getCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    isShowInMenu: category.isShowInMenu,
    sort: category.sort,
    createdAt: moment(category.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(category.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  }
}
