import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public createSubjectSchema = schema.create({
    name: schema.string(),
    slug: schema.string(),
  })

  public messages = {
    required: '{{ field }} id required',
  }
}
