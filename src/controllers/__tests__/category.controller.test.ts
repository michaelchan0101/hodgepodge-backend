import request, { injectHeader } from 'tests/supertestHelper'
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
  const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  describe('ADMIN', () => {
    test('Endpoint GET /api/admin/v1.0/categories', async () => {
      mockedCategoryService.adminListCategories.mockResolvedValueOnce(fakeCategoryResp)
      const req = {
        categoryId: 1,
        limit: 10,
        offset: 0,
      }
      const response: any = await request(app)
        .get('/api/admin/v1.0/categories')
        .set('Authorization', fakeHeader.token)
        .set('Auth-Schema', fakeHeader.schema)
        .query(req)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(fakeCategoryResp)
      expect(mockedCategoryService.adminListCategories).toHaveBeenCalledTimes(1)
      expect(mockedCategoryService.adminListCategories).toBeCalledWith()
    })

    test('Endpoint POST /api/admin/v1.0/categories', async () => {
      mockedCategoryService.adminCreateCategory.mockResolvedValueOnce(fakeCategoryResp)
      const req = {
        sort: 1,
        name: 'test',
        isShowInMenu: true,
      }
      const response: any = await request(app)
        .post('/api/admin/v1.0/categories')
        .set('Authorization', fakeHeader.token)
        .set('Auth-Schema', fakeHeader.schema)
        .send(req)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(fakeCategoryResp)
      expect(mockedCategoryService.adminCreateCategory).toHaveBeenCalledTimes(1)
      expect(mockedCategoryService.adminCreateCategory).toBeCalledWith(req)
    })

    test('Endpoint PATCH /api/admin/v1.0/categories/:id', async () => {
      mockedCategoryService.adminUpdateCategory.mockResolvedValueOnce(fakeCategoryResp)
      const req = {
        sort: 1,
        name: 'test',
        isShowInMenu: true,
      }
      const response: any = await request(app)
        .patch('/api/admin/v1.0/categories/1')
        .set('Authorization', fakeHeader.token)
        .set('Auth-Schema', fakeHeader.schema)
        .send(req)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(fakeCategoryResp)
      expect(mockedCategoryService.adminUpdateCategory).toHaveBeenCalledTimes(1)
      expect(mockedCategoryService.adminUpdateCategory).toBeCalledWith(1, req)
    })
  })

  test('Endpoint GET /api/client/v1.0/categories', async () => {
    mockedCategoryService.listCategories.mockResolvedValueOnce(fakeCategoryResp)

    const response: any = await request(app).get('/api/client/v1.0/categories')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeCategoryResp)
    expect(mockedCategoryService.listCategories).toHaveBeenCalledTimes(1)
    expect(mockedCategoryService.listCategories).toBeCalledWith()
  })
})
