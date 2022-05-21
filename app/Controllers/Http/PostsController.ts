import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.get()
    const posts = await Post.query()
      .preload('user')
      .preload('thubnail')
      .preload('video')
      .paginate(page, perPage)

    return response.json(posts)
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { thumbnailId, videoId, title, description } = request.all()

    const post = await Post.create({
      thubnailId: thumbnailId,
      videoId,
      title,
      description,
      userId: auth.user?.id,
    })

    return response.json(post)
  }

  public async show({ params, response }: HttpContextContract) {
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('thubnail')
      .preload('video')

    return response.json(post)
  }

  public async update({ params, request, auth, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (post.userId !== auth.user?.id) {
      return response.forbidden()
    }

    const data = request.all()

    post.merge(data)
    await post.save()

    return response.json(post)
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (post.userId !== auth.user?.id) {
      return response.forbidden()
    }

    await post.delete()

    return response.noContent()
  }
}
