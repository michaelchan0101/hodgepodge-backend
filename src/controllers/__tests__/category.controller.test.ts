import request from 'tests/supertestHelper'
import categoryService from 'services/category.service'
import http from 'http'

jest.mock('services/category.service')

let app = null

beforeAll(async () => {
  app = await require('app').createApiServer()
  app = http.createServer(app.callback())
})

const mockedCategoryService = categoryService as jest.Mocked<typeof categoryService>
describe('CategoryController', () => {
  const fakeCategoryResp: any = {
    id: 1,
    username: 'xxx',
  }
  // const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  test('Endpoint GET /api/v1.0/categories', async () => {
    mockedCategoryService.listCategories.mockResolvedValueOnce(fakeCategoryResp)

    const response: any = await request(app).get('/api/v1.0/categories')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeCategoryResp)
    expect(mockedCategoryService.listCategories).toHaveBeenCalledTimes(1)
    expect(mockedCategoryService.listCategories).toBeCalledWith()
  })
})
