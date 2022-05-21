import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubjectSevice from 'App/Services/SubjectService'
import SubjectValidator from 'App/Validators/SubjectValidator'

export default class SubjectsController {
  private service: SubjectSevice

  constructor() {
    this.service = new SubjectSevice()
  }

  public async index({ response, request }: HttpContextContract) {
    const page = request.qs().page ?? 1
    const limit = request.qs().limit ?? 10
    const search = request.qs().search ?? ''

    const subjects = await this.service.show(search, limit, page)
    return response.json(subjects)
  }

  public async store(ctx: HttpContextContract) {
    const validator = new SubjectValidator(ctx)
    const data = await ctx.request.validate({ schema: validator.createSubjectSchema })
    const subject = await this.service.create(data)
    return ctx.response.json(subject)
  }
}
