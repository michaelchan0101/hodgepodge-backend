import { Category } from '@/models'
import { CategoryResponse } from 'interfaces/category'
export function getCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
  }
}
