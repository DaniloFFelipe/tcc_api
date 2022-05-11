import Subject from 'App/Models/Subject'

type CreateProps = {
  name: string
}

export default class SubjectSevice {
  public async create(data: CreateProps) {
    const subject = new Subject()
    subject.name = data.name
    await subject.save()

    return subject
  }
}
