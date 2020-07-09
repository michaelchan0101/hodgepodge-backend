'use strict'
import PrettyError from 'pretty-error'
import _ from 'lodash'

const pe = PrettyError.start()
pe.withoutColors()

/**
 * Base error class of the payment system, all error should extends from this or you should
 * catch and re-throw to our custom error
 */
export class BaseError extends Error {
  public statusCode: number
  public code: number
  public data: any
  public details: string

  public constructor(
    statusCode: number,
    categoryCode: number,
    errorCode: number,
    message = '',
    err: any = '',
    data: any = null
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = categoryCode * 100 + errorCode
    this.data = data
    if (err instanceof Error) {
      this.details = pe.render(err)
    } else {
      this.details = err.toString()
    }
  }

  public toJson() {
    const errorObj = {
      error: {
        code: this.code,
        name: this.name,
        message: this.message,
        details: this.details,
        data: undefined,
      },
    }
    if (!_.isNil(this.data)) {
      errorObj.error.data = this.data
    }
    return errorObj
  }

  public toString() {
    return `statusCode=${this.statusCode}, errorCode=${this.code}, message=${this.message}, details=${this.details}`
  }
}
