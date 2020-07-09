import request from 'tests/supertestHelper'
import http from 'http'

let app = null

beforeAll(async () => {
  app = await require('app').createApiServer()
  app = http.createServer(app.callback())
})

describe('ConfigController', () => {
  // const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  test('Endpoint GET /api/v1.0/categories', async () => {
    const response: any = await request(app).get('/api/v1.0/config')
    expect(response.statusCode).toBe(200)
  })
})
