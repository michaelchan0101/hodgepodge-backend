import Joi from '@hapi/joi'
import { Context, Next } from 'interfaces/http'
import { ValidationError } from '@/errors'
interface ApiParamVerifierOption {
  body?: Record<string, any>
  query?: Record<string, any>
}
function validate(schema?: Joi.ObjectSchema, data?: any) {
  if (schema) {
    const result = schema.validate(data)
    if (result.error) {
      throw new ValidationError(result.error)
    }
  }
}
export default function (option: ApiParamVerifierOption) {
  let bodySchema = null
  let querySchema = null
  if (option.body) {
    bodySchema = Joi.object(option.body)
  }
  if (option.query) {
    querySchema = Joi.object(option.query)
  }
  return (ctx: Context, next: Next) => {
    validate(bodySchema, ctx.request.body)
    validate(querySchema, ctx.request.query)
    return next()
  }
}
