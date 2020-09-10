import request, { injectHeader } from 'tests/supertestHelper'
import adminService from 'services/admin.service'
import http from 'http'

jest.mock('services/admin.service')

let app = null

beforeAll(async () => {
  app = await require('app').createApiServer()
  app = http.createServer(app.callback())
})

const mockedAdminService = adminService as jest.Mocked<typeof adminService>
describe('ArticleController', () => {
  const fakeAdminResp: any = {
    id: 1,
    username: 'xxx',
  }
  const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  // const fakeHeader = injectHeader({ id: 1, username: 'debug' })
  test('Endpoint GET /api/admin/v1.0/login', async () => {
    mockedAdminService.loginAdmin.mockResolvedValueOnce(fakeAdminResp)
    const req = {
      username: 'admin',
      password: '123456',
    }
    const response: any = await request(app).post('/api/admin/v1.0/login').send(req)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeAdminResp)
    expect(mockedAdminService.loginAdmin).toHaveBeenCalledTimes(1)
    expect(mockedAdminService.loginAdmin).toBeCalledWith(req.username, req.password)
  })

  test('Endpoint GET /api/admin/v1.0/admins', async () => {
    mockedAdminService.listAdmins.mockResolvedValueOnce(fakeAdminResp)
    const response: any = await request(app)
      .get('/api/admin/v1.0/admins')
      .set('Authorization', fakeHeader.token)
      .set('Auth-Schema', fakeHeader.schema)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeAdminResp)
    expect(mockedAdminService.listAdmins).toHaveBeenCalledTimes(1)
    expect(mockedAdminService.listAdmins).toBeCalledWith()
  })

  test('Endpoint POST /api/admin/v1.0/admins', async () => {
    mockedAdminService.createAdmin.mockResolvedValueOnce(fakeAdminResp)
    const req = {
      username: 'admin',
      password: '123456',
    }
    const response: any = await request(app)
      .post('/api/admin/v1.0/admins')
      .set('Authorization', fakeHeader.token)
      .set('Auth-Schema', fakeHeader.schema)
      .send(req)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeAdminResp)
    expect(mockedAdminService.createAdmin).toHaveBeenCalledTimes(1)
    expect(mockedAdminService.createAdmin).toBeCalledWith(req.username, req.password)
  })

  test('Endpoint DELETE /api/admin/v1.0/admins/:id', async () => {
    mockedAdminService.deleteAdmin.mockResolvedValueOnce(undefined)
    const response: any = await request(app)
      .delete('/api/admin/v1.0/admins/1')
      .set('Authorization', fakeHeader.token)
      .set('Auth-Schema', fakeHeader.schema)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({})
    expect(mockedAdminService.deleteAdmin).toHaveBeenCalledTimes(1)
    expect(mockedAdminService.deleteAdmin).toBeCalledWith(1)
  })

  test('Endpoint PATCH /api/admin/v1.0/admins/:id/password', async () => {
    const req = { password: '123456' }
    mockedAdminService.updateAdminPassword.mockResolvedValueOnce(fakeAdminResp)
    const response: any = await request(app)
      .patch('/api/admin/v1.0/admins/1/password')
      .set('Authorization', fakeHeader.token)
      .set('Auth-Schema', fakeHeader.schema)
      .send(req)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeAdminResp)
    expect(mockedAdminService.updateAdminPassword).toHaveBeenCalledTimes(1)
    expect(mockedAdminService.updateAdminPassword).toBeCalledWith(1, req.password)
  })
})
