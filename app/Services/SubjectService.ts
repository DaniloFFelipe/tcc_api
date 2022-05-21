import AppExceptions from 'App/Exceptions/AppExceptions'
import Subject from 'App/Models/Subject'

type CreateProps = {
  name: string
  slug: string
}

export default class SubjectSevice {
  public async create(data: CreateProps) {
    const slugExists = await this.getFromSlug(data.slug)

    if (slugExists) {
      throw AppExceptions.badRequest('slug already exists')
    }

    const subject = new Subject()
    subject.name = data.name
    subject.slug = data.slug
    await subject.save()
    return subject
  }

  public async show(search = '', page = 1, limit = 10) {
    const subjects = await Subject.query().where('name', 'like', search).paginate(page, limit)
    return subjects
  }

  public async findBySlug(slug: string) {
    const subject = this.getFromSlug(slug)

    if (!slug) {
      throw AppExceptions.notFound('subject not found')
    }

    return subject
  }

  private async getFromSlug(slug: string) {
    const subject = await Subject.findBy('slug', slug)

    return subject
  }
}
