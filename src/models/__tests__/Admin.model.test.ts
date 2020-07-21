import { Admin } from '..'

describe('Admin Model', () => {
  test('create Admin success', async () => {
    const exampleData = {
      username: 'category 1',
      password: '123456',
      passwordSalt: 'abcd',
    }

    const result = await Admin.create(exampleData)
    expect(result.username).toEqual(exampleData.username)
    expect(result.password).toEqual(exampleData.password)
    expect(result.passwordSalt).toEqual(exampleData.passwordSalt)
  })
})
