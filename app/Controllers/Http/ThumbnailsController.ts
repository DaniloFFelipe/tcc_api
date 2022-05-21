import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FILES_CONSTANTS } from 'App/constants/files'
import AppExceptions from 'App/Exceptions/AppExceptions'
import ThumbnailsSevice from 'App/Services/ThumbnailsSevice'

export default class ThumbnailsController {
  private service: ThumbnailsSevice

  constructor() {
    this.service = new ThumbnailsSevice()
  }

  public async upload({ response, request }: HttpContextContract) {
    const thumbnail = request.file('thumbnail', { extnames: FILES_CONSTANTS.THUMBNAILS.EXTENSIONS })

    if (!thumbnail) {
      throw AppExceptions.badRequest('Thumbnail is required')
    }

    await thumbnail.moveToDisk(FILES_CONSTANTS.THUMBNAILS.PATH_TO_DISK)
    const url = FILES_CONSTANTS.THUMBNAILS.PATH + thumbnail.fileName
    const thumb = await this.service.create({ url })

    return response.status(201).json({
      thumbnail: thumb,
    })
  }
}
