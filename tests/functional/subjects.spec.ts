import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

function generateData() {
  const name = faker.name.jobTitle()
  const slug = faker.name.jobType().toLowerCase()

  return {
    name,
    slug,
  }
}

test.group('subjects tests', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should create a subject if correct data is provided', async ({ client }) => {
    const payload = generateData()
    const response = await client.post('/subjects').form(payload)

    response.assertStatus(200)
    response.assertBodyContains({ name: payload.name, slug: payload.slug })
  })

  test('should list subjects created', async ({ client }) => {
    const payload = generateData()
    await client.post('/subjects').form(payload)
    const response = await client.get('/subjects')

    response.assertStatus(200)
    response.assertBodyContains({ data: [] })
  })
})
