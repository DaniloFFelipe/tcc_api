import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PostService } from 'App/Services/PostService'
import SubjectService from 'App/Services/SubjectService'

export default class FeedsController {
  private postService: PostService
  private subjectService: SubjectService

  constructor() {
    this.postService = new PostService()
    this.subjectService = new SubjectService()
  }

  public async getFeed({ response, request }: HttpContextContract) {
    const { page, perPage, subjectId } = request.qs()
    let posts: any[] = []

    if (!subjectId) {
      posts = await this.postService.index({ page, perPage })
    } else {
      posts = await this.postService.indexBySubject({ page, perPage, subjectId })
    }

    return response.json(posts)
  }

  public async getSubject({ response }: HttpContextContract) {
    const subjects = await this.subjectService.show()
    return response.json(subjects)
  }

  public async searchPost({ response, request }: HttpContextContract) {
    const { page, perPage, title } = request.qs()
    const posts = await this.postService.index({ page, perPage, title: title })
    return response.json(posts)
  }
}
