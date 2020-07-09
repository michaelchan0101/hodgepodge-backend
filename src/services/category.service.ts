import { Category } from '@/models'
import { CategoryObjResponse, CategoryResponse } from 'interfaces/category'
import { Op } from 'sequelize'

function getCategoryObjResponse(
  categoryObj: CategoryObjResponse,
  categorys: Array<Category>
): CategoryObjResponse {
  categorys.forEach(category => {
    categoryObj[category.name] = {
      id: category.id,
      name: category.name,
    }
  })
  return categoryObj
}
export default {
  async batchCreateCategories(names: string[]): Promise<CategoryObjResponse> {
    const categorys = await Category.findAll({
      where: { name: { [Op.in]: names } },
    })
    const categoryObj: CategoryObjResponse = getCategoryObjResponse({}, categorys)

    const nCategorys = await Category.bulkCreate(
      names.filter(name => !categoryObj[name]).map(name => ({ name }))
    )
    return getCategoryObjResponse(categoryObj, nCategorys)
  },
  async listCategories(): Promise<{ categories: Array<CategoryResponse> }> {
    const categories = await Category.findAll({
      order: [['id', 'DESC']],
    })
    return {
      categories: categories.map(category => category.getResponse()),
    }
  },
}
