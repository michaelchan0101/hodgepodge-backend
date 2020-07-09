import request from 'tests/supertestHelper'
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
  // const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  test('Endpoint GET /api/v1.0/articles', async () => {
    mockedArticleService.listArticles.mockResolvedValueOnce(fakeArticleResp)
    const req = {
      categoryId: 1,
      limit: 10,
      offset: 0,
    }
    const response: any = await request(app).get('/api/v1.0/articles').query(req)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeArticleResp)
    expect(mockedArticleService.listArticles).toHaveBeenCalledTimes(1)
    expect(mockedArticleService.listArticles).toBeCalledWith(
      { categoryId: req.categoryId },
      req.limit,
      req.offset
    )
  })

  test('Endpoint GET /api/v1.0/articles/:id', async () => {
    mockedArticleService.getArticle.mockResolvedValueOnce(fakeArticleResp)
    const response: any = await request(app).get('/api/v1.0/articles/1')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeArticleResp)
    expect(mockedArticleService.getArticle).toHaveBeenCalledTimes(1)
    expect(mockedArticleService.getArticle).toBeCalledWith(1)
  })
})
