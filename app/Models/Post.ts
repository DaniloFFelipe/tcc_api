import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './user'
import Thumbnail from './Thumbnail'
import Video from './Video'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column({ columnName: 'user_id', serializeAs: null })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ columnName: 'thubnail_id', serializeAs: null })
  public thubnailId: number

  @belongsTo(() => Thumbnail)
  public thubnail: BelongsTo<typeof Thumbnail>

  @column({ columnName: 'video_id', serializeAs: null })
  public videoId: number

  @belongsTo(() => Video)
  public video: BelongsTo<typeof Video>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
