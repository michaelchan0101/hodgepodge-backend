import request, { injectHeader } from 'tests/supertestHelper'
import articleService from 'services/article.service'
import http from 'http'

jest.mock('services/article.service')

let app = null

beforeAll(async () => {
  app = await require('app').createApiServer()
  app = http.createServer(app.callback())
})

const mockedArticleService = articleService as jest.Mocked<typeof articleService>
describe('ArticleController', () => {
  const fakeArticleResp: any = {
    id: 1,
    username: 'xxx',
  }
  const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  describe('ADMIN', () => {
    test('Endpoint GET /api/admin/v1.0/articles', async () => {
      mockedArticleService.listArticles.mockResolvedValueOnce(fakeArticleResp)
      const req = {
        categoryId: 1,
        limit: 10,
        offset: 0,
      }
      const response: any = await request(app)
        .get('/api/admin/v1.0/articles')
        .set('Authorization', fakeHeader.token)
        .set('Auth-Schema', fakeHeader.schema)
        .query(req)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(fakeArticleResp)
      expect(mockedArticleService.listArticles).toHaveBeenCalledTimes(1)
      expect(mockedArticleService.listArticles).toBeCalledWith(
        { categoryId: req.categoryId },
        req.limit,
        req.offset
      )
      mockedArticleService.listArticles.mockClear()
    })

    test('Endpoint POST /api/admin/v1.0/articles', async () => {
      mockedArticleService.adminCreateArticle.mockResolvedValueOnce(fakeArticleResp)
      const req = {
        categoryId: 1,
        title: 'test',
        content: 'test',
      }
      const response: any = await request(app)
        .post('/api/admin/v1.0/articles')
        .set('Authorization', fakeHeader.token)
        .set('Auth-Schema', fakeHeader.schema)
        .send(req)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(fakeArticleResp)
      expect(mockedArticleService.adminCreateArticle).toHaveBeenCalledTimes(1)
      expect(mockedArticleService.adminCreateArticle).toBeCalledWith(req)
    })
    test('Endpoint PATCH /api/admin/v1.0/articles/:id', async () => {
      mockedArticleService.adminUpdateArticle.mockResolvedValueOnce(fakeArticleResp)
      const req = {
        categoryId: 1,
        title: 'test',
        content: 'test',
      }
      const response: any = await request(app)
        .patch('/api/admin/v1.0/articles/1')
        .set('Authorization', fakeHeader.token)
        .set('Auth-Schema', fakeHeader.schema)
        .send(req)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(fakeArticleResp)
      expect(mockedArticleService.adminUpdateArticle).toHaveBeenCalledTimes(1)
      expect(mockedArticleService.adminUpdateArticle).toBeCalledWith(1, req)
    })
  })

  test('Endpoint GET /api/client/v1.0/articles', async () => {
    mockedArticleService.listArticles.mockResolvedValueOnce(fakeArticleResp)
    const req = {
      categoryId: 1,
      limit: 10,
      offset: 0,
    }
    const response: any = await request(app).get('/api/client/v1.0/articles').query(req)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeArticleResp)
    expect(mockedArticleService.listArticles).toHaveBeenCalledTimes(1)
    expect(mockedArticleService.listArticles).toBeCalledWith(
      { categoryId: req.categoryId },
      req.limit,
      req.offset
    )
  })

  test('Endpoint GET /api/client/v1.0/articles/:id', async () => {
    mockedArticleService.getArticle.mockResolvedValueOnce(fakeArticleResp)
    const response: any = await request(app).get('/api/client/v1.0/articles/1')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeArticleResp)
    expect(mockedArticleService.getArticle).toHaveBeenCalledTimes(1)
    expect(mockedArticleService.getArticle).toBeCalledWith(1)
  })
})
