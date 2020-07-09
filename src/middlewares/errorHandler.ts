import { Context, Next } from 'koa'
import _ from 'lodash'
import * as Sequelize from 'sequelize'

import logger from 'utils/logger'
import * as errors from 'errors'

export async function generalErrorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      error = new errors.ValidationError(error.message)
    }

    let e = null
    if (error && error instanceof errors.BaseError) {
      logger.warn('known error - %s|params:%j', error, ctx.request.query)
      e = error
    } else {
      e = new errors.UnknownServerError(error)
      logger.error(
        'unknown error - %s|details:%s|params:%j',
        error,
        e.details,
        ctx.request.query
      )
    }
    ctx.status = e.statusCode
    ctx.body = e.toJson()
  }
}
