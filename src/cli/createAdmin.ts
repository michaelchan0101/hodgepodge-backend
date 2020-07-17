export const handle = async function (argv: Record<string, any>): Promise<void> {
  const { username = '', password = '' } = argv
  if (username.length === 0 || password.length < 6) {
    console.log('参数格式错误！！！ 用户名长度 >= 1，密码长度 >= 6')
    return
  }
  const sequelize = require('drivers/sequelize').default
  const adminService = require('services/admin.service').default
  await adminService.createAdmin(username, String(password))
  await sequelize.close()
}

export const description = 'create admin'

export const signature = 'createAdmin'

export const params = {
  username: {
    alias: 'u',
    type: 'string',
    description: 'please input username!!! example:admin e:etc',
  },
  password: {
    alias: 'p',
    type: 'string',
    description: 'please input password!!! example:admin e:etc',
  },
}
