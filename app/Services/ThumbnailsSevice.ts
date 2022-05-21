import { randomUUID } from 'node:crypto'
import Thumbnail from '../Models/Thumbnail'

type ThumbnailsCreateProps = {
  url: string
}

export default class ThumbnailsSevice {
  public async create(data: ThumbnailsCreateProps) {
    const thumbnail = new Thumbnail()
    thumbnail.name = randomUUID()
    thumbnail.url = data.url

    await thumbnail.save()
    return thumbnail
  }
}
