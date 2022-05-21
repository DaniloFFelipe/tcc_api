import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public createUserSchema = schema.create({
    username: schema.string(),
    email: schema.string([rules.email()]),
    password: schema.string(),
    password_confirmation: schema.string([rules.confirmed('password')]),
  })

  public loginInSchema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string(),
  })

  public checkUsernameSchema = schema.create({
    username: schema.string(),
  })

  public checkEmailSchema = schema.create({
    email: schema.string([rules.email()]),
  })

  public messages = {
    'required': 'the {{ field }} is required to create a new account',
    'password_confirmation.confirmed': 'password do not match',
  }
}
