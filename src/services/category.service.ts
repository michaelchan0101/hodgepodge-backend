import { Category } from '@/models'
import { CategoryResponse, CreateCategoryRequest } from 'interfaces/category'

export default {
  async listCategories(): Promise<{ categories: Array<CategoryResponse> }> {
    const categories = await Category.findAll({
      where: { isShowInMenu: true },
      order: [
        ['sort', 'DESC'],
        ['id', 'DESC'],
      ],
    })
    return {
      categories: categories.map(category => category.getResponse()),
    }
  },
  async adminListCategories(): Promise<{ categories: Array<CategoryResponse> }> {
    const categories = await Category.findAll({
      order: [['id', 'DESC']],
    })
    return {
      categories: categories.map(category => category.getResponse()),
    }
  },
  async adminCreateCategory(req: CreateCategoryRequest): Promise<CategoryResponse> {
    const category = await Category.create({
      name: req.name,
      isShowInMenu: req.isShowInMenu,
      sort: req.sort,
    })
    return category.getResponse()
  },
}
