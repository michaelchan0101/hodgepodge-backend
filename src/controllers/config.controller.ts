import { Context } from 'interfaces/http'
import config from '@/config'
export default {
  async getConfig(ctx: Context) {
    ctx.body = config.web
  },
}
