/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { randomUUID } from 'node:crypto'
import Video from '../Models/Video'

type VideosCreateProps = {
  url: string
}

export default class VideosSevice {
  async create(data: VideosCreateProps) {
    const video = new Video()

    Object.assign(video, {
      name: randomUUID(),
      url: data.url,
    })

    await video.save()
    return video
  }
}
