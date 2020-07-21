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

  test('should create category successfully', async () => {
    const data = {
      name: 'test-1001',
      isShowInMenu: false,
      sort: 1,
    }
    const category = await categoryService.createCategory(data)
    expect(category.name).toEqual(data.name)
    expect(category.isShowInMenu).toEqual(data.isShowInMenu)
    expect(category.sort).toEqual(data.sort)
  })
})
