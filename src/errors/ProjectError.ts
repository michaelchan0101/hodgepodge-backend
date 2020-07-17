import { BaseError } from './BaseError'

class ProjectError extends BaseError {
  public constructor(errorCode: number, message: string, err: any = '') {
    super(400, 103, errorCode, message, err)
  }
}

export class AdminUsernameOrPasswordError extends ProjectError {
  public constructor() {
    super(1, '用户名或者密码错误')
  }
}
