import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('description').notNullable()

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('video_id').unsigned().references('videos.id').onDelete('CASCADE')
      table.integer('thubnail_id').unsigned().references('thubnails.id').onDelete('CASCADE')
      table.integer('subject_id').unsigned().references('subjects.id').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
