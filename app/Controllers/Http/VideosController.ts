import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FILES_CONSTANTS } from 'App/constants/files'
import AppExceptions from 'App/Exceptions/AppExceptions'
import VideosSevice from 'App/Services/VideosSevice'

export default class VideosController {
  private service: VideosSevice

  constructor() {
    this.service = new VideosSevice()
  }

  public async upload({ response, request }: HttpContextContract) {
    const video = request.file('video', { extnames: FILES_CONSTANTS.VIDEOS.EXTENSIONS })

    if (!video) {
      throw AppExceptions.badRequest('Video is required')
    }

    await video.moveToDisk(FILES_CONSTANTS.VIDEOS.PATH_TO_DISK)
    const url = FILES_CONSTANTS.VIDEOS.PATH + video.fileName
    const thumb = await this.service.create({ url })

    return response.status(201).json({
      Video: thumb,
    })
  }
}
