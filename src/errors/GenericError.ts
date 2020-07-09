import { BaseError } from './BaseError'

// class 100: Generic error
class GenericError extends BaseError {
  public constructor(
    statusCode: number,
    errorCode: number,
    message: string,
    err: any = ''
  ) {
    super(statusCode, 100, errorCode, message, err)
  }
}

export class UnknownServerError extends GenericError {
  public constructor(err: any) {
    super(500, 0, 'unknown server error', err)
  }
}

export class ValidationError extends GenericError {
  public constructor(err: any) {
    super(400, 1, 'request validation error', err)
  }
}

export class MethodNotAllowedError extends GenericError {
  public constructor(err: any) {
    super(405, 2, 'method not allowed', err)
  }
}

export class ResourceNotFoundError extends GenericError {
  public constructor(req: any) {
    super(404, 3, `resource not found in server:${req.method}:${req.path}`)
  }
}
