import { Category, Article } from '@/models'
import { CategoryResponse, CreateCategoryRequest } from 'interfaces/category'
import { CategoryNotFoundError, CategoryHasArticleError } from '@/errors'

async function getCategoryById(id: number): Promise<Category> {
  const category = await Category.findByPk(id)
  if (!category) {
    throw new CategoryNotFoundError(id)
  }
  return category
}

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
  async adminUpdateCategory(
    id: number,
    req: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    const category = await getCategoryById(id)
    await category.update({
      name: req.name,
      isShowInMenu: req.isShowInMenu,
      sort: req.sort,
    })
    return category.getResponse()
  },
  async deleteCategory(id: number): Promise<void> {
    const category = await getCategoryById(id)
    const article = await Article.findOne({ where: { categoryId: id } })
    if (article) {
      throw new CategoryHasArticleError()
    }
    await category.destroy()
  },
}
