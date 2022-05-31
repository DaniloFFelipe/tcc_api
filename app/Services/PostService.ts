import AppExceptions from 'App/Exceptions/AppExceptions'
import Post from 'App/Models/Post'

type IndexParams = {
  title?: string
  page: number
  perPage: number
}

type StoreParams = {
  thubnailId: number
  videoId: number
  title: string
  description: string
  subjectId: number
  userId?: number
}

type IndexBySubjectParams = {
  subjectId: number
} & PaginatedBase

type PaginatedBase = {
  page: number
  perPage: number
}

type GetPostByUserIdParams = {
  userId: number
} & PaginatedBase

export class PostService {
  public async index({ title, page, perPage }: IndexParams) {
    if (title) {
      const lowerTitle = title.toLowerCase()

      const posts = await Post.query()
        .whereRaw(`LOWER(posts.title) like '%${lowerTitle}%'`)
        .orderBy('created_at', 'desc')
        .preload('user')
        .preload('thubnail')
        .preload('video')
        .preload('subject')
        .paginate(page, perPage)

      return posts
    }

    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .preload('user')
      .preload('thubnail')
      .preload('video')
      .preload('subject')
      .paginate(page, perPage)

    return posts
  }

  public async indexBySubject({ page, perPage, subjectId }: IndexBySubjectParams) {
    const posts = await Post.query()
      .where('subject_id', subjectId)
      .orderBy('created_at', 'desc')
      .preload('user')
      .preload('thubnail')
      .preload('video')
      .preload('subject')
      .paginate(page, perPage)

    return posts
  }

  public async store(data: StoreParams) {
    const post = await Post.create(data)
    return post
  }

  public async show(id: number) {
    const post = await Post.query()
      .where('id', id)
      .preload('user')
      .preload('thubnail')
      .preload('video')
      .preload('subject')

    return post
  }

  public async update(id: number, data: StoreParams) {
    const post = await Post.findOrFail(id)

    if (post.userId !== data.userId) {
      throw AppExceptions.unauthoraized()
    }

    post.merge(data)
    await post.save()
    return post
  }

  public async destroy(id: number, userId: number | undefined) {
    const post = await Post.findOrFail(id)

    if (post.userId !== userId) {
      throw AppExceptions.unauthoraized()
    }

    await post.delete()
  }

  public async getPostByUser({ userId, page, perPage }: GetPostByUserIdParams) {
    const posts = await Post.query()
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .preload('thubnail')
      .preload('video')
      .preload('subject')
      .paginate(page, perPage)

    return posts
  }
}
