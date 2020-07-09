import categoryService from 'services/category.service'
import fixtures from 'tests/fixtures'

describe('CategoryService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })

  test('should list categories successfully', async () => {
    const results = await categoryService.listCategories()
    expect(results.categories).toHaveLength(5)
    expect(results.categories[0].id).toEqual(5)
    expect(results.categories[1].id).toEqual(4)
  })

  test('should batch create category successfully', async () => {
    const names = ['category-1', 'category-2', 'category-3', 'category-4']
    const categoryObj = await categoryService.batchCreateCategories(names)
    expect(Object.keys(categoryObj)).toHaveLength(names.length)
    names.forEach(name => {
      expect(categoryObj[name].name).toEqual(name)
    })
  })
})
