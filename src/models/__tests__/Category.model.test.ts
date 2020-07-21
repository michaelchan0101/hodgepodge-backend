// global.cleanData = true
// global.loadFixtures = false
import { Category } from '..'

describe('Category Model', () => {
  test('create category success', async () => {
    const exampleData = {
      name: 'category 1',
      isShowInMenu: true,
      sort: 1,
    }

    const result = await Category.create(exampleData)
    expect(result.name).toEqual(exampleData.name)
    expect(result.isShowInMenu).toEqual(exampleData.isShowInMenu)
    expect(result.sort).toEqual(exampleData.sort)
  })
})
