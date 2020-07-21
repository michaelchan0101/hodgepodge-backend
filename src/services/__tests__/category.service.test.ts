import categoryService from 'services/category.service'
import fixtures from 'tests/fixtures'

describe('CategoryService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })

  test('should list categories successfully', async () => {
    const results = await categoryService.listCategories()
    expect(results.categories).toHaveLength(3)
    expect(results.categories[0].id).toEqual(1)
    expect(results.categories[1].id).toEqual(3)
  })

  test('should admin list categories successfully', async () => {
    const results = await categoryService.adminListCategories()
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
    const category = await categoryService.adminCreateCategory(data)
    expect(category.name).toEqual(data.name)
    expect(category.isShowInMenu).toEqual(data.isShowInMenu)
    expect(category.sort).toEqual(data.sort)
  })

  test('should update category successfully', async () => {
    const data = {
      name: 'test-1',
      isShowInMenu: true,
      sort: 1,
    }
    const category = await categoryService.adminUpdateCategory(1, data)
    expect(category.id).toEqual(1)
    expect(category.name).toEqual(data.name)
    expect(category.isShowInMenu).toEqual(data.isShowInMenu)
    expect(category.sort).toEqual(data.sort)
  })
})
