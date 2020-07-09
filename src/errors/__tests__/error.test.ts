import * as errors from '../'

describe('HodgepodgeError', () => {
  test('new BaseError w/o details', () => {
    const err = new errors.BaseError(400, 100, 1, 'message')
    expect(err.toJson()).toEqual({
      error: {
        code: 10001,
        name: 'BaseError',
        message: 'message',
        details: '',
      },
    })
  })

  test('new BaseError with details as string', () => {
    const err = new errors.BaseError(400, 100, 1, 'message', 'details')
    expect(err.toJson()).toEqual({
      error: {
        code: 10001,
        name: 'BaseError',
        message: 'message',
        details: 'details',
      },
    })
    expect(err.toString()).toBe(
      'statusCode=400, errorCode=10001, message=message, details=details'
    )
  })

  test('new BaseError with details as a number too', () => {
    const err = new errors.BaseError(400, 100, 0, 'message', 12345)
    expect(err.toJson()).toEqual({
      error: {
        code: 10000,
        name: 'BaseError',
        message: 'message',
        details: '12345',
      },
    })
    expect(err.toString()).toBe(
      'statusCode=400, errorCode=10000, message=message, details=12345'
    )
  })

  test('new BaseError with details as Error', () => {
    const err = new errors.BaseError(400, 100, 1, 'message', new Error('error'))
    const json = err.toJson()
    expect(json.error.code).toBe(10001)
    expect(json.error.name).toBe('BaseError')
    expect(json.error.message).toBe('message')
    expect(json.error.details).toBeTruthy()
  })
})

describe('Check duplicate error codes', () => {
  it('should be no duplicate error code', () => {
    const errorCodeMap = {}
    const duplicateErrorCodes = []
    for (const property in errors) {
      try {
        const error = new errors[property]()
        if (error.name !== 'BaseError') {
          if (errorCodeMap[error.code]) {
            duplicateErrorCodes.push(error.code)
          } else {
            errorCodeMap[error.code] = true
          }
        }
      } catch (err) {
        const error = new errors[property]({
          name: 'name',
          message: 'message',
        })
        if (error.name !== 'BaseError') {
          if (errorCodeMap[error.code]) {
            console.log(error.name, error.code, 2)
            duplicateErrorCodes.push(error.code)
          } else {
            errorCodeMap[error.code] = true
          }
        }
      }
    }

    if (duplicateErrorCodes.length > 0) {
      console.log('duplicateErrorCodes', duplicateErrorCodes.join(', '))
    }
    expect(duplicateErrorCodes).toHaveLength(0)
  })
})
