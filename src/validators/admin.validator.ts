import { Admin } from '@/models'
import { AdminNotFoundError, AdminUsernameOrPasswordError } from '@/errors'
import { encryptPassword } from '@/utils'

class AdminValidator {
  public model: Admin
  constructor(model: Admin) {
    this.model = model
  }
  public exists(remark?: string): AdminValidator {
    if (!this.model) {
      throw new AdminNotFoundError(remark)
    }
    return this
  }

  public password(password: string): AdminValidator {
    const p1 = encryptPassword(password, this.model.passwordSalt)
    if (p1 !== this.model.password) {
      throw new AdminUsernameOrPasswordError()
    }
    return this
  }
}

export default (model: Admin): AdminValidator => new AdminValidator(model)
