import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PostService } from 'App/Services/PostService'

export default class PostsController {
  private service: PostService

  constructor() {
    this.service = new PostService()
  }

  public async index({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()
    const { title } = request.qs()

    const posts = await this.service.index({ title, page, perPage })

    return response.json(posts)
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { thumbnailId, videoId, title, description, subjectId } = request.all()

    const post = await this.service.store({
      thubnailId: thumbnailId,
      videoId,
      title,
      description,
      userId: auth.user?.id,
      subjectId,
    })

    return response.json(post)
  }

  public async show({ params, response }: HttpContextContract) {
    const post = await this.service.show(params.id)

    return response.json(post)
  }

  public async update({ params, request, auth, response }: HttpContextContract) {
    const { thumbnailId, videoId, title, description, subjectId } = request.all()

    const post = await this.service.update(params.id, {
      thubnailId: thumbnailId,
      videoId,
      title,
      description,
      userId: auth.user?.id,
      subjectId,
    })

    return response.json(post)
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    await this.service.destroy(params.id, auth.user?.id)

    return response.noContent()
  }

  public async postMe({ auth, response, request }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()
    const posts = await this.service.getPostByUser({ userId: auth.user!.id, page, perPage })

    return response.json(posts)
  }
}
