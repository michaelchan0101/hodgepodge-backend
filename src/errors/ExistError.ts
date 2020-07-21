import { BaseError } from './BaseError'

class ExistError extends BaseError {
  public constructor(errorCode: number, message: string, err: any = '') {
    super(400, 102, errorCode, message, err)
  }
}

export class AdminExistError extends ExistError {
  public constructor(username: string) {
    super(1, `管理员（${username}）已存在`)
  }
}
