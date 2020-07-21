import { BaseError } from './BaseError'

// class 300: NotFound Error
class NotFoundError extends BaseError {
  public constructor(errorCode: number, message: string, err: any = '') {
    super(400, 101, errorCode, message, err)
  }
}

export class ArticleNotFoundError extends NotFoundError {
  public constructor(id: number) {
    super(1, `文章（${id}）不存在`)
  }
}

export class AdminNotFoundError extends NotFoundError {
  public constructor(username: string) {
    super(2, `管理员（${username}）不存在`)
  }
}

export class CategoryNotFoundError extends NotFoundError {
  public constructor(id: number) {
    super(3, `分类（${id}）不存在`)
  }
}
