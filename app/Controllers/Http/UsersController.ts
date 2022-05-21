import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersServices from 'App/Services/UserServices'
import UsersValidator from 'App/Validators/UserValidator'

export default class UsersController {
  private service: UsersServices

  constructor() {
    this.service = new UsersServices()
  }

  public async signUp(ctx: HttpContextContract) {
    const validator = new UsersValidator(ctx)
    const { request, response, auth } = ctx

    const { email, password, username } = await request.validate({
      schema: validator.createUserSchema,
    })

    await this.service.signUp({ email, password, username })

    try {
      const token = await auth.use('api').attempt(email, password)
      const user = auth.user
      return response.status(200).json({ token, user })
    } catch {
      return response.internalServerError()
    }
  }

  public async login(ctx: HttpContextContract) {
    const validator = new UsersValidator(ctx)
    const { request, response, auth } = ctx

    const { email, password } = await request.validate({
      schema: validator.loginInSchema,
    })

    try {
      const token = await auth.use('api').attempt(email, password)
      const user = auth.user
      return response.status(200).json({ token, user })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async checkUsername(ctx: HttpContextContract) {
    const validator = new UsersValidator(ctx)
    const { request, response } = ctx

    const { username } = await request.validate({
      schema: validator.checkUsernameSchema,
    })

    const exists = await this.service.checkUsername(username)

    return response.status(200).json({ exists })
  }

  public async checkEmail(ctx: HttpContextContract) {
    const validator = new UsersValidator(ctx)
    const { request, response } = ctx

    const { email } = await request.validate({
      schema: validator.checkEmailSchema,
    })

    const exists = await this.service.checkEmail(email)

    return response.status(200).json({ exists })
  }
}
